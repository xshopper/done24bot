const li = {
    BASE_URL: 'https://www.linkedin.com',
    description: 'Like the main feed on linkedin',
    window: null,
    utils: null,
    bot: null,
    form: [{ "id": "nr_of_likes", "elem" : "input", "placeholder" : "nr of likes"}],

    parameters: null,

    init: async () => {
        console.log('init...');
        li.bot.utils = await li.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/linkedin.js');
    },

    process: async () => {
        console.log('process');
        let log = await li.utils.log({ "filename": "index_in_like_only", "function": "process", "url": li.bot.page.url(), "linkedin": li.bot.username });


        const loginData = await li.bot.login();

        await li.utils.saveCookies(li.bot).catch(function (error) {
            console.log(error);
        });

        await li.utils.sleep(1000);

        try {
            return await li.bot.mainFeedLike(li.parameters.nr_of_likes);
        } catch (e) {
            console.log(e);s
	    return e;
        }

    },
}

module.exports = li;
