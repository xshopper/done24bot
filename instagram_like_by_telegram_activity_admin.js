const ig = {
BASE_URL:'http://telegram.done24bot.com',
description: 'Admin interface for Telegram groups',
window:null,
utils:null,
bot : null,
parameters:{},
form: [{ "id": "v_user_id", "elem" : "input", "placeholder" : "user_id from telegram @done24boti (type /start there)"}],

init: async() => {
	console.log('init...');
	ig.bot = await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/instagram.js')
	ig.bot.utils = ig.utils;
},

process: async () => {
        var account = await ig.utils.data({"method": 'GET', "endpoint" : 'account'})
	console.log(account);

	var url = 'http://telegram.done24bot.com/index.php?user_id='+account.data.user_id+'&password='+account.data.password+'&telegram_id='+ig.parameters['v_user_id'];
    	await ig.window.page.goto(url);

	console.log('process');
	
	await ig.utils.sleep(30000000);

}
}

module.exports = ig;
