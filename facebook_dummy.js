const ig = {
BASE_URL:'https://m.facebook.com/?utm_source=pwa_homescreen',
description: 'Just a dummy script for development/testing. It just wait with the login ....',
window:null,
utils:null,
bot : null,
parameters:null,

init: async() => {
	console.log('init...');
	//ig.bot = await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/instagram.js')
	ig.bot = require('/Users/gbacskai/Documents/done24bot/websites/facebook.js');
	ig.bot.utils = ig.utils;
},

process: async () => {
	console.log('process');

	const loginData = await ig.bot.login();

	await ig.utils.saveCookies(ig.bot).catch(function(error) {
		console.log(error);
	});

	await ig.utils.sleep(30000000);

}
}

module.exports = ig;
