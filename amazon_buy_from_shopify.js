const ig = {
BASE_URL:'https://www.amazon.com.au',
description: 'Connect to shopify, search in amazon.com.au for the barcode and puchase the product for the shopify customer',
window:null,
utils:null,
pluginmanager:null,
bot : null,
lodash : null,
parameters:null,
url : null,
querystring : null,
diacritics: null,
user_name:null,
form: [{ "id": "shopify_url", "elem" : "input", "placeholder" : "shopify_url with username/password"}
//	,{ "id": "card_name", "elem" : "input", "placeholder" : "Name on Credit card"}
	,{ "id": "card_nr", "elem" : "input", "placeholder" : "Credit card Number"} 
//        ,{ "id": "card_expmonth", "elem" : "input", "placeholder" : "Credit card expire month MM"}
//	,{ "id": "card_expyear", "elem" : "input", "placeholder" : "Credit card Expire year YYYY"}
//	,{ "id": "card_cvv", "elem" : "input", "placeholder" : "Credit Card CVV"}
	,{ "id": "amazon_password", "elem" : "input", "placeholder" : "Amazon Password"}
	,{ "id": "gift_card", "elem" : "input", "placeholder" : "Gift Card"}
	,{ "id": "gift_from", "elem" : "input", "placeholder" : "Gift From"}  ],

init: async() => {
	console.log('init...');
	console.log('installing required packages...')
	
	ig.bot =  await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/amazon.com.au.js')
	ig.bot.utils = ig.utils;

	try {
          await ig.pluginmanager.install("url");
          ig.bot.url = await ig.pluginmanager.require("url");

          await ig.pluginmanager.install("querystring");
          ig.bot.querystring = await ig.pluginmanager.require("querystring");

	  await ig.pluginmanager.install("diacritics");
	  ig.diacritics = await ig.pluginmanager.require("diacritics");
        } catch(e) {
          console.log(e)
        }

	await ig.pluginmanager.install("lodash");
	ig.lodash = await ig.pluginmanager.require("lodash");
},

process: async () => {

        var shopify = await ig.utils.requireFromURL('https://raw.githubusercontent.com/xshopper/done24bot/master/websites/shopify.js')

	shopify.utils = ig.utils;
	shopify.initialise(ig.parameters.shopify_url);

	console.log('process');
        let log = await ig.utils.log({"filename" : "index_az_buy", "function" : "process", "url" : ig.bot.page.url(), "instagram" : ig.bot.username });

	const loginData = await ig.bot.login();

	await ig.utils.saveCookies(ig.bot).catch(function(error) {
		console.log(error);
	});

	console.log('load shopify orders')
	var since_id = 0;
 while(true) {
    	var shopify_orders = await shopify.getOrders('limit=1&since_id='+since_id+'&status=open&fulfillment_status=unshipped');

    if(!shopify_orders.orders.length) {
        console.log('no more orders')
        return;
    }

    

 for(var order_nr=0;order_nr<shopify_orders.orders.length;order_nr++) {

    since_id = shopify_orders.orders[order_nr].id; 

    var order = shopify_orders.orders[order_nr];

    await shopify.updateOrder (since_id, "purchaser" , ig.utils.user_id )
    var now = new Date();
    await shopify.updateOrder (since_id, "purchase_start" , now.toISOString() )

    if (order.tags === 'amazon.com.au') {

      ig.parameters.order_id = order.id;
      console.log('order number', order.order_number)

      ig.parameters.products = []

      for(var o=0;o<order.line_items.length;o++) {
	var p = await shopify.getProduct(order.line_items[o].product_id)
	console.log(p)
	ig.parameters['products'].push( {"barcode" : p.products[0].variants[0].barcode , "qty" : order.line_items[o].quantity })
      }

      ig.parameters['customer'] = {}

      ig.parameters['customer']['name'] = order.shipping_address.first_name.replace(/’/,"").trim() + " " + order.shipping_address.last_name.replace(/’/,"").trim();
      ig.parameters['customer']['name'] = ig.diacritics.remove(ig.parameters['customer']['name']);

      ig.parameters['customer']['address'] = order.shipping_address.address1.replace(/\n/g,' ').trim();
      ig.parameters['customer']['address'] = ig.diacritics.remove(ig.parameters['customer']['address']);

      if(order.shipping_address.address2 || order.shipping_address.address2 !== null) {
        ig.parameters['customer']['address2'] = order.shipping_address.address2.replace(/\n/g,' ').trim();
	ig.parameters['customer']['address2'] = ig.diacritics.remove(ig.parameters['customer']['address2']);
      } else {
	ig.parameters['customer']['address2'] = ''
      }
      if(!order.shipping_address.phone) {
  	  order.shipping_address.phone ='0'
      }

      let address_text = order.shipping_address.address1 + ", " + order.shipping_address.zip + "," + order.shipping_address.city + ", " + order.shipping_address.country

      let address = await ig.utils.data({ method: 'POST', data : {"address" : address_text} , endpoint : 'address'})
      console.log('address:', address)
      try {
	    var picked_zip = ig.lodash.filter(address[0].address_components, { "types" : [ 'postal_code' ] } )[0].long_name.replace(/\n/g,' ');
      } catch(e) {
	    var picked_zip = ig.lodash.filter(address[1].address_components, { "types" : [ 'postal_code' ] } )[0].long_name.replace(/\n/g,' ');
      }

      var city_original = order.shipping_address.city.toUpperCase();

      try {
    	var picked_city = ig.lodash.filter(address[0].address_components, { "types" : [ 'locality', 'political' ] } )[0].long_name.toUpperCase().replace(/\n/g,' ');
      } catch(e) {
        var picked_city = ig.lodash.filter(address[0].address_components, { "types" : [ 'postal_town' ] } )[0].long_name.toUpperCase().replace(/\n/g,' ');
      }
      var picked_country = ig.lodash.filter(address[0].address_components, { "types" : [ 'country', 'political' ] } )[0].long_name.replace(/\n/g,' ');

      // console.log('found address', address[0]);

      ig.parameters['customer']['phone'] = order.shipping_address.phone.replace('+61','0');
      if (ig.parameters['customer']['phone'] === "0") {
	ig.parameters['customer']['phone'] = "000000000"
      }
      ig.parameters['customer']['city'] = picked_city.replace(/\n/g,' ').replace(/SAINT /g,'ST ');
      ig.parameters['customer']['city_original'] = city_original.replace(/\n/g,' ').replace(/SAINT /g,'ST ');

      try {
    	ig.parameters['customer']['state'] = order.shipping_address.province_code.replace(/\n/g,' ');
      } catch(e) {
	ig.parameters['customer']['state'] = '';
      }
      ig.parameters['customer']['postcode'] = picked_zip;
      ig.parameters['customer']['country'] = picked_country;
      ig.parameters['giftcard'] = ig.parameters.giftcard + " Order:" + order.order_number,

      ig.parameters['buyer'] = {}
      ig.parameters['buyer']['nameOnCard'] = ig.parameters.card_name;
      ig.parameters['buyer']['cardNumber'] = ig.parameters.card_nr;
      ig.parameters['buyer']['expireMonth'] = ig.parameters.card_expmonth;
      ig.parameters['buyer']['expireYear'] = ig.parameters.card_expyear;
      ig.parameters['buyer']['cvv'] = ig.parameters.card_cvv;

      ig.parameters.giftcard = ig.parameters.gift_card + "order:" + order.order_number;
      ig.parameters.giftfrom = ig.parameters.gift_from;

      if(picked_country === 'Australia') {
    	console.log('buy', ig.parameters);
    	var url = await ig.bot.buyProducts(ig.parameters);
	if(url) {
		console.log(url);
	    	let full = await shopify.setFullfillment(ig.parameters.order_id, url);
		await ig.utils.saveCookies(ig.bot).catch(function(error) {
                	console.log(error);
        	});
	} else {
		console.log("Ordered is not appeared:", ig.parameters.order_id );
	}
     }
    }
   }
  }
 }
}
module.exports = ig;
