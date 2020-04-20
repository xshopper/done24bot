const li = {
    BASE_URL: 'https://www.linkedin.com',
    description: 'For Development purpose, opens Linkedin and logs in',
    window: null,
    utils: null,
    bot: null,
    form: [],

    parameters: null,

    init: async () => {
        console.log('init...');
        li.bot = await li.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/linkedin.js');
    },

    process: async () => {
        console.log('process');

        const loginData = await li.bot.login();
	let log = await li.utils.log({ "filename": "index_in_dummy.js", "function": "process", "url": li.bot.page.url(), "linkedin": li.bot.username });      

        await li.utils.saveCookies(li.bot).catch(function (error) {
            console.log(error);
        });

        await li.utils.sleep(100000000);

    },
}

module.exports = li;
