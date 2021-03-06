const ig = {
BASE_URL:'https://instagram.com?utm_source=pwa_homescreen',
description: 'Log in with username/password to instagram',
utils:null,
parameters:{},
form: [{ "id": "v_username", "elem" : "input", "placeholder" : "Username"}, { "id": "v_password", "elem" : "input", "placeholder" : "Password"}],
init: async() => {
	console.log('init.......new');
	ig.bot = await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/instagram.js')
	
	ig.bot.utils = ig.utils;
},

process: async () => {
	console.log('process');
        let log = await ig.utils.log({"filename" : "index_ig_login", "function" : "process", "url" : ig.bot.page.url(), "instagram" : ig.bot.username });

	const loginData = await ig.bot.login(ig.parameters.v_username, ig.parameters.v_password);
	console.log('logged in ...')

	await ig.utils.saveCookies(ig.bot).catch(function(error) {
                console.log(error);
        });

	return 'Logged in';
}
}

module.exports = ig;
