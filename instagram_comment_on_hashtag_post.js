const ig = {
    BASE_URL: 'https://instagram.com?utm_source=pwa_homescreen',
    description: 'Send comment to a specific hastags on the recent posts.',
    window: null,
    utils: null,
    bot: null,
    form: [{ "id": "nr_of_likes", "elem": "input", "placeholder": "nr of likes", "value": "10" },
	   { "id": "hashtag", "elem": "input", "placeholder": "Hashtag", "value": "#hashtag" },
	   { "id": "message", "elem": "input", "placeholder": "Comment", "value": "Hello :)" }],

    parameters: null,

    init: async () => {
        console.log('init...');
        ig.bot = await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/instagram.js');
        ig.bot.utils = ig.utils;
    },

    process: async () => {

        const loginData = await ig.bot.login();

        await ig.utils.saveCookies(ig.bot).catch(function (error) {
            console.log(error);
        });

        if (loginData.status === 'Add Phone Number' || loginData.status === 'Disabled Account' || loginData.status === 'Suspicious Login Attempt' || loginData.status === 'Error') {
            console.log(ig.utils.session, "login Error");
            await ig.utils.data(ig.bot, loginData).catch(function (err) { console.log('error: ', err); });
            await ig.utils.data({ "method": 'POST', "endpoint": 'log', "headers": { "session": data.session, "url": ig.bot.page.url() }, "data": loginData.status })
            await ig.bot.browser.close();
            cb(null);
        }

        await ig.utils.sleep(1000);

        try {
            await ig.bot.navigateToExampleProfile(ig.parameters.hashtag);

            await ig.bot.openRecentPostOneByOne(ig.parameters.nr_of_likes, async (col, item) => {
		//var user = await ig.bot.getUsernameFromPost();
                await ig.bot.openComments();
		try {
			var myComment = await ig.bot.page.waitFor('//*[@role="main"]//*[@href="/' + ig.bot.username + '/"]', { timeout: 2000 });
		} catch(e) {
			var myComment  = null;
		}

		if(!myComment) {
			var log = await ig.bot.pastComment(ig.parameters.message);
			if (log && log.wait > 0) {
                                console.log('wait ' + log)
                                await ig.utils.sleep(log.wait);
                        }
		}

                await ig.bot.goBack();
            });
            return;
        } catch (e) {
            console.log(e);
            return 'error happened in the index_ig_commenter.js';
        }

    },
}

module.exports = ig;
