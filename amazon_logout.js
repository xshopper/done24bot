const ig = {
BASE_URL:'https://www.amazon.com.au',
description: 'Logs out from amazon.com.au',
window:null,
utils:null,
bot : null,
lodash : null,
parameters:null,
form: [],

init: async() => {
	console.log('init...');
	ig.bot= await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/amazon.com.au.js')
	ig.bot.utils = ig.utils;
},

process: async () => {

	await ig.utils.deleteCookies(ig.bot).catch(function(error) {
                console.log(error);
        });

	await ig.utils.saveCookies(ig.bot).catch(function(error) {
		console.log(error);
	});

 }
}
module.exports = ig;
