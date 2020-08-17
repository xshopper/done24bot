const ig = {
BASE_URL:null,
description: 'Just a dummy script for development/testing. It just wait with the login ....',
window:null,
utils:null,
bot : null,
parameters:null,

init: async() => {
	ig.BASE_URL = 'https://instagram.com/p/CBjjqUVBcy1/?utm_source=pwa_homescreen';
	console.log('init...');
	ig.bot = await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/instagram.js')
	ig.bot.utils = ig.utils;
},

process: async () => {
	console.log('process');
        let log = await ig.utils.log({"filename" : "index_ig_dummy", "function" : "process", "url" : ig.bot.page.url(), "instagram" : ig.bot.username });
	var username = await ig.bot.getUsernameFromPost();
	console.log(username);
	return true;
}
}

module.exports = ig;
