const ig = {
BASE_URL:'https://instagram.com?utm_source=pwa_homescreen',
description: 'From telegram groups likes all links from the last 24h where the account been seen, use the user_id been given in telegram @done24bot after you type /start',
utils:null,
windower:null,
parameters:{},
insta : 'https://www.instagram.com',
query_hash:null,
form: [{ "id": "v_user_id", "elem" : "input", "placeholder" : "telegram_id (check @done24bot in telegram)"}],
data:null,
init: async() => {
	console.log('init.......new');
	ig.bot = await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/instagram.js')
	ig.bot.utils = ig.utils;

	console.log('....loading urls');
	ig.data = await utils.data ({"method" : "GET", "endpoint" : 'tglist',  "headers" : { "telegram_id" : ig.parameters.v_user_id} })
	console.log('urls:', ig.urls);
},

like_posts: async () => {

        await ig.bot.navigateDirectMessageRequests('treathuntersau');


	for (var i = 0; i < ig.data.urls.urls.length; i++) { /// loop on my posts 
		var shortmedia = ig.data.urls.urls[i].media_id;
		shortmedia = shortmedia.match(/\/([a-zA-Z0-9]{11})\//)[1];

		var username = await ig.get_username(shortmedia);

		console.log(username);

		await ig.bot.sendDirectMessage('@' + username);

		var user = '//*[text()="@' + username  + '"]';
	        const userButton = await ig.windower.page.waitForSelector(user, { timeout: 3000 });
        	await userButton.click();

		var post = '//a[contains(@href,"' + shortmedia + '")]';
                const postButton = await ig.windower.page.waitForSelector(post, { timeout: 3000 });
		await postButton.click();

                var log = await ig.bot.likePost();
                if (log.wait > 0) {
		    console.log(log);
                    console.log('wait ' + log.wait)
		    alert(log.reached_limit + " ... waiting " + (log.wait/60000) + " minutes")
                    await ig.utils.sleep(log.wait);
                }

		await ig.bot.goBack();
		await ig.bot.goBack();

                //await ig.utils.sleep(3000);
        }

	await ig.bot.goBack();
        await ig.bot.goBack();
	await ig.bot.goBack();

},

get_username: async (shortmedia) => {

        if(!ig.query_hash) {
                let bodyHTML = await ig.windower.page.evaluate(() => document.body.innerHTML);
                let url = bodyHTML.match(/\/(static\/bundles\/.+\/Consumer\.js\/.+\.js)/g)[1];

                var body2HTML = await ig.utils.httpRequestText(ig.insta + url);

                var hashes = body2HTML.match(/[a-zA-Z]="([a-zA-Z0-9]{32})"/g);

                for(var i=0;i<hashes.length;i++) {
                        hashes[i] = hashes[i].substr(2).replaceAll('"','');
                }
                ig.query_hash = hashes[7];
        }

        try {
                var body3HTML = await ig.utils.httpRequestText('https://www.instagram.com/graphql/query/?query_hash=' + ig.query_hash + '&variables=%7B%22shortcode%22%3A%22' + shortmedia + '%22%7D');
                var jsondata = JSON.parse(body3HTML);

                return jsondata['data']['shortcode_media']['owner']['username']
        } catch(e) {
                return;
                return ig.get_username();
        }
},


process: async () => {

	if(!Number.isInteger(parseInt(ig.parameters.v_user_id))) {
                alert("the telegram ID needs to be a number!")
        }

	console.log('process');

	const loginData = await ig.bot.login();
	console.log('logged in ...', ig.data.urls.length)

	if(ig.data.urls.length == 0) {
		if( ig.data.nr_liked > 0) {
			return ("Seems all links been liked, check out the admin page for the links and groups");
		} else {
			alert("We do not see any of your activity in any groups");
			return ("please type /group and the invite link at @done24bot in telegram for adding a new group");
		}
	}

	while(ig.data.urls.length > 0) {
		console.log('urls:', ig.data.urls)
		await ig.utils.saveCookies(ig.bot).catch(function(error) {
            	    console.log(error);
        	});  

		ig.data.urls = await utils.data ({"method" : "GET", "endpoint" : 'tglist',  "headers" : { "telegram_id" : ig.parameters.v_user_id} })
		console.log('start loop');
		await ig.like_posts();
	}

}
}

module.exports = ig;
