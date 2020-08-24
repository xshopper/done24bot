const ig = {
BASE_URL:'https://instagram.com?utm_source=pwa_homescreen',
description: 'From telegram groups likes all links from the last 24h where the account been seen, use the user_id been given in telegram @done24bot after you type /start',
video : 'https://drive.google.com/file/d/1zS2AiyuhIs4V_nxwJdkw06GqG5CveBEs/view?usp=sharing',
utils:null,
parameters:{},
form: [{ "id": "v_user_id", "elem" : "input", "placeholder" : "user_id from telegram @done24boti (type /start there)"}],
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

	for (var i = 0; i < ig.data.urls.urls.length; i++) { /// loop on my posts 
                await ig.bot.page.goto('https://www.instagram.com/p/' + ig.data.urls.urls[i].media_id + '/');
                
                var log = await ig.bot.likePost();
                if (log.wait > 0) {
		    console.log(log);
                    console.log('wait ' + log.wait)
		    alert(log.reached_limit + " ... waiting " + (log.wait/60000) + " minutes")
                    await ig.utils.sleep(log.wait);
                }
                await ig.utils.sleep(3000);
        }
},

process: async () => {

	if(!Number.isInteger(parseInt(ig.parameters.v_user_id))) {
                alert("the telegram ID needs to be a number!")
        }

	console.log('process');
        let log = await ig.utils.log({"filename" : "index_ig_like", "function" : "process", "url" : ig.bot.page.url(), "instagram" : ig.bot.username, "telegram_id" : ig.parameters.v_user_id });

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
