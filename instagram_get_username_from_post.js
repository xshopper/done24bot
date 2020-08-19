const ig = {
BASE_URL:null,
description: 'Get Username from Post',
window:null,
utils:null,
bot : null,
parameters:null,
form: [{ "id": "post_id", "elem": "input", "placeholder": "CBjjqUVBcy1", "value": "CBjjqUVBcy1" }],
parameters: null,

init: async() => {
	ig.BASE_URL = 'https://instagram.com/p/'+ig.parameters.post_id+'/?utm_source=pwa_homescreen';
	console.log('init...');
	ig.bot = await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/instagram.js')
	ig.bot.utils = ig.utils;
},

process: async () => {
	console.log('process');
	var username = await ig.bot.getUsernameFromPost();
	console.log({"#post_id#":ig.parameters.post_id, "#username#": username});
	return username;
}
}

module.exports = ig;
