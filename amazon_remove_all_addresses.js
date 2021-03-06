const ig = {
BASE_URL:'https://www.amazon.com.au',
description: 'Remove all addresses from amazon.com.au',
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

	ig.lodash = await ig.utils.requireFromURL('https://raw.githubusercontent.com/lodash/lodash/4.17.15-npm/lodash.js');
	
},

process: async () => {

	console.log('process');

	const loginData = await ig.bot.login();

	await ig.utils.saveCookies(ig.bot).catch(function(error) {
		console.log(error);
	});

	await ig.bot.page.goto(ig.BASE_URL+ '/a/addresses/')

	var new_address = true;

	var e = '//*[@id="ya-myab-address-delete-btn-0-announce"]'

	while (new_address) {
	    try {
		await ig.bot.page.waitForSelector(e, { timeout : 5000});
	    } catch(e) {
		new_address = false;	
	    } 
	    var e = '//*[@id="ya-myab-address-delete-btn-0-announce"]'
            await ig.bot.utils.click(ig.bot, e, 10000)
	    var elem = '//*[@id="deleteAddressModal-0-submit-btn-announce"]/../input'
	    await ig.bot.utils.click(ig.bot, elem, 5000)
	}
 }
}
module.exports = ig;
