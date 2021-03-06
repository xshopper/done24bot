const ig = {
    BASE_URL: 'https://instagram.com?utm_source=pwa_homescreen',
    description: 'Like the main feed on instagram',
    window: null,
    utils: null,
    bot: null,
    form: [{ "id": "nr_of_likes", "elem" : "input", "placeholder" : "nr of likes", "value" : "10"}],

    parameters: null,

    init: async () => {
        console.log('init...');
        ig.bot = await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/instagram.js');
        ig.bot.utils = ig.utils;
    },

    process: async () => {
        console.log('process');

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
            await ig.bot.mainFeedLike(ig.parameters.nr_of_likes);
	    return 'index_ig_like_only script is finished';
        } catch (e) {
            console.log(e);
	    return 'error happened in the index_ig_like_only.js';
        }

    },
}

module.exports = ig;
