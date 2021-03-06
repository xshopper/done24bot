const puppeteer = require('puppeteer');
var utils = require('./utils');
const devices = require('puppeteer/DeviceDescriptors');
const BASE_URL = 'https://shopback.com.au';

const element = {
    signIn: '//*[@id="hmenu-content"]/ul[1]/li[17]/a',
    signInButton: '//*[contains(text(),"Sign In")]',
    signedIn: '//*[contains(text(),"Sign Out")]',
    usernameInput: 'input[id="ap_email_login"]',
    usernameContinue: '/html/body/div[1]/div[2]/div[3]/div[2]/div/div[2]/div/div[2]/form/div[3]/div/span/span/input',
    passwordInput: 'input[id="ap_password"]',
    signInBtn: '//*[@id="signInSubmit"]',
    productSearch: 'input[id="nav-search-keywords"]',
    clearSearch: '//*[contains(@aria-label,"Clear search keywords")]',
    productSearchSubmit: '/html/body/div[1]/header/div/div[4]/form/div[2]/div/input',
    searchProductNode: '//*[contains(@class,"s-search-results")]//*[@data-index="0"]//*[@title="product-detail"]',
    seeBuyingBtn: '//*[contains(text(),"Buy Now")]',
    addCartBtn: '//*[contains(text(),"Add to Cart")]/../input',
    checkGift: '//*[@id="sc-buy-box-gift-checkbox"]',
    checkoutBtn: '//*[@id="a-autoid-0-announce"]',
    checkoutPassword: 'input[id="ap_password"]',
    checkoutPasswordSubmit: '//*[@id="signInSubmit"]',
    deliveryAddress: '//*[contains(text(),"Delivery address")]/..//div',
    placeYourOrder: '//*[contains(text(),"Place your order")]',
    addNewAddress: '//*[contains(text(),"Add a New Address")]',
    inputFullname: 'input[id="enterAddressFullName"]',
    inputPhoneno: 'input[id="enterAddressPhoneNumber"]',
    inputAddress: 'input[id="enterAddressAddressLine1"]',
    inputPostcode: 'input[id="enterAddressPostalCode"]',
    inputCity: 'input[id="enterAddressCityText"]',
    inputState: 'input[id="enterAddressStateOrRegionText"]',
    submitAddress: '//*[@id="address-new"]/div/span/form/span/span/input',
    gifTextarea: '#message-area-0',
    gifTextareaEle: '//*[@id="message-area-0"]',
    cart: '//*[@aria-label="Cart"]',
    empytCart : '//*[contains(text(),"Your Shopping Cart is empty")]',
    deleteCart: '//*[contains(@class,"a-span-last")]//*[contains(text(),"Delete")]/..//input',
    home: '//*[@id="nav-logo"]/a',
    closeAppModal: '//*[@id="afap-interstitial-dlg"]/div[5]/div/span/a',
    cartItemNumber: '//*[@id="nav-button-cart"]/div/span',
    saveGiftOption: '//*[@id="chewbacca-save-gift-options-button"]/span/input',
    addGiftOptions : '//*[contains(text(),"Add gift options")]//..',
    continueDelivery: '//*[@id="a-autoid-0"]/span/input',
    continueDeliveryNew: '//*[@id="shippingOptionFormId"]/span[1]/span/input',
    addNewPaymentMethod: '//*[contains(text(),"Add a new payment method")]/../..',
    addCreditCard: '//*[contains(text(),"Add a credit or debit card")]/../..',
    paymentContinue : '//*[text()="Continue"]/../..//input',
    Continue : '//*[@value="Continue"]',
    useThisAddress : '//*[contains(text(),"Use this Address")]',
    nameOnCard: 'input[name="ppw-accountHolderName"]', //'//*[contains(@placeholder,"Name on card")]',
    cardNumber: 'input[name="addCreditCardNumber"]', //'//*[contains(@placeholder,"Card number")]',
    selectExpMonth: 'select[name="ppw-expirationDate_month"]',
    selectExpYear: 'select[name="ppw-expirationDate_year"]',
    quantity: '//*[contains(text(),"Qty:")]',
    citySuburbTown: '//*[contains(text(),"City/Suburb/Town")]',
    addYourCard: '//*[contains(text(),"Add your card")]/..//input',
    placeYourOrder: '//*[contains(text(),"Place your order")]/..//input',
    reviewOrder: '//*[text()[contains(.,"Review")]]',
    trackShipment : '//*[text()[contains(.,"Track shipment")]]'
}


const amazon = {
    browser: null,
    page: null,
    instagram: null,
    user_id: null,
    password: null,
    headless: false,
    parameters : null,
    element,

    initialize: async () => {

        amazon.browser = await puppeteer.launch({
            headless: amazon.headless,
            args: ['--lang=en-US,en --window-size=750,1334', '--ignore-certificate-errors', '--auto-open-devtools-for-tabs']
        });

        amazon.page = await amazon.browser.newPage();
        await amazon.page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 12_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/74.0.3729.155 Mobile/15E148 Safari/605.1')
        await amazon.page.emulate(devices['iPhone 7']);
        await amazon.page.setExtraHTTPHeaders({
            'Accept-Language': 'en'
        });
	await amazon.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    },

    checkLogin: async (in_timeout, bot) => {
	console.log('checkLogin', in_timeout);
	try {
      		await bot.page.waitForSelector(element.signedIn, { timeout: in_timeout });
		console.log('checkLogin true')
		return true;
   	} catch (e) {
		console.log('checkLogin false')
		return false;
    	}
    },
    gotoLogin: async () => {
	console.log('gotoLogin');
	const loginButton1 = await amazon.page.$x(element.signInButton);
      	await loginButton1[0].click();
    },
    login: async (username, password) => {
        await amazon.page.goto(BASE_URL, { waitUntil: 'networkidle0' });

        await amazon.page.waitForSelector(2000);

        await amazon.page.evaluate((element) => {
            const signInButtonEle = document.evaluate(element.signIn, document, null, XPathResult.ANY_TYPE, null);
            const signInButton = signInButtonEle.iterateNext();
            signInButton && signInButton.click();
        }, amazon.element);

        await amazon.page.waitForSelector(1000);

        await amazon.page.waitForSelector(amazon.element.usernameInput);
        await amazon.page.type(amazon.element.usernameInput, username, { delay: 50 });

        await amazon.page.waitForSelector(1000);

        await amazon.page.evaluate((element) => {
            const continueBtnEle = document.evaluate(element.usernameContinue, document, null, XPathResult.ANY_TYPE, null);
            const continueBtn = continueBtnEle.iterateNext();
            continueBtn && continueBtn.click();
        }, amazon.element);

        await amazon.page.waitForSelector(1000);

        await amazon.page.waitForSelector(amazon.element.passwordInput);
        await amazon.page.type(amazon.element.passwordInput, password, { delay: 50 });

        await amazon.page.waitForSelector(1000);

        await amazon.page.evaluate((element) => {
            const signInBtnEle = document.evaluate(element.signInBtn, document, null, XPathResult.ANY_TYPE, null);
            const signInBtn = signInBtnEle.iterateNext();
            signInBtn && signInBtn.click();
        }, amazon.element);


    },

    searchProducts: async () => {

	await amazon.page.waitForSelector(1000);
        await utils.click(amazon, amazon.element.cart, 1000)
	await amazon.page.waitForSelector(1000);

	var empty = false;

	while (!empty) {	
		try {
			await amazon.page.waitForSelector(amazon.element.empytCart , { timeout : 1000 })
			empty = true
		} catch (e) {
			empty = false
        		await utils.click(amazon, amazon.element.deleteCart, 1000)
			await amazon.page.waitForSelector(3000);
		}
	}
	await amazon.home();

        await amazon.page.waitForSelectorNavigation({ waitUntil: 'networkidle0' })


	for(var i=0;i<amazon.parameters.products.length;i++) {
		await utils.clearInput(amazon, amazon.element.productSearch);
       		await amazon.page.waitForSelector(amazon.element.productSearch);
       		await amazon.page.type(amazon.element.productSearch, amazon.parameters.products[i].amazon, { delay: 50 });
       		await amazon.page.keyboard.press('Enter');
       		await amazon.page.waitForSelector(3000);
		await utils.click(amazon, amazon.element.searchProductNode, 10000)
		await amazon.page.waitForSelector(5000);
		await utils.click(amazon, amazon.element.quantity, 1000)
		await amazon.page.waitForSelector(5000);
		await utils.click(amazon, '//*[contains(@data-value, \'"stringVal":"'+amazon.parameters.products[i].qty+'"\')]', 3000)
		await utils.wait(3000, amazon);
		await utils.click(amazon, amazon.element.addCartBtn, 10000)
       		await amazon.page.waitForSelector(5000);
		await utils.click(amazon, amazon.element.checkGift, 10000)
        	await amazon.page.waitForSelector(1000);
	}

	console.log('checkoutBtn')
        await amazon.page.waitForSelector(amazon.element.checkoutBtn);
        await amazon.page.evaluate((element) => {
            const checkoutBtnEle = document.evaluate(element.checkoutBtn, document, null, XPathResult.ANY_TYPE, null)
            const checkoutBtn = checkoutBtnEle.iterateNext();
            checkoutBtn && checkoutBtn.click();
        }, amazon.element);

/*	console.log('checkoutPassword')
        try {

            await amazon.page.waitForSelector(1000);

            await amazon.page.waitForSelector(amazon.element.checkoutPassword);
            await amazon.page.type(amazon.element.checkoutPassword, password, { delay: 50 });

            await amazon.page.waitForSelector(1000);

            await amazon.page.waitForSelector(amazon.element.checkoutPasswordSubmit);
            await amazon.page.evaluate((element) => {
                const checkoutPasswordSubmitEle = document.evaluate(element.checkoutPasswordSubmit, document, null, XPathResult.ANY_TYPE, null)
                const checkoutPasswordSubmit = checkoutPasswordSubmitEle.iterateNext();
                checkoutPasswordSubmit && checkoutPasswordSubmit.click();
            }, amazon.element);
        } catch (err) {
            console.error(err);
        }
*/

	await utils.wait(2000, amazon);
	await utils.click(amazon , amazon.element.addNewAddress, 10000);
        await utils.wait(2000, amazon);

	console.log('inputFullname');
        await amazon.page.waitForSelector(amazon.element.inputFullname);
        await amazon.page.type(amazon.element.inputFullname, amazon.parameters.customer.name, { delay: 50 });

	console.log('inputPhoneno');
        await amazon.page.waitForSelector(amazon.element.inputPhoneno);
        await amazon.page.type(amazon.element.inputPhoneno, amazon.parameters.customer.phone, { delay: 50 });

	console.log('inputAddress');
        await amazon.page.waitForSelector(amazon.element.inputAddress);
        await amazon.page.type(amazon.element.inputAddress, amazon.parameters.customer.address, { delay: 50 });

	console.log('inputPostcode');
        await amazon.page.waitForSelector(amazon.element.inputPostcode);
        await amazon.page.type(amazon.element.inputPostcode, amazon.parameters.customer.postcode, { delay: 50 });
        await amazon.page.$eval(amazon.element.inputPostcode, e => e.blur());

	try {
		await amazon.page.waitForSelector(2000);
		await amazon.page.waitForSelector(amazon.element.citySuburbTown);
                await utils.click(amazon, '//*[@id="enterAddressCitySelectContainer"]//*[@role="button"]' , 1000);
                await amazon.page.waitForSelector(3000);
		await utils.click(amazon, '//a[@data-value=\'{"stringVal":"'+amazon.parameters.customer.city+'"}\']', 3000)
		await amazon.page.waitForSelector(3000);
	} catch(e) {
		console.log('only one city');
		console.log(e);
	}	

//	console.log('inputCity');
//        await amazon.page.waitForSelector(amazon.element.inputCity);
//        await amazon.page.type(amazon.element.inputCity, amazon.parameters.customer.city, { delay: 50 });

//	console.log('inputState');
//        await amazon.page.waitForSelector(amazon.element.inputState);
//        await amazon.page.type(amazon.element.inputState, amazon.parameters.customer.state, { delay: 50 });

	console.log('submitAddress')
        await amazon.page.waitForSelector(amazon.element.submitAddress);
        await amazon.page.evaluate((element) => {
            const submitAddressEle = document.evaluate(element.submitAddress, document, null, XPathResult.ANY_TYPE, null)
            const submitAddress = submitAddressEle.iterateNext();
            submitAddress && submitAddress.click();
        }, amazon.element);

        let body = amazon.parameters.giftcard;
	let from = amazon.parameters.giftfrom;

	await utils.wait(3000, amazon);

	for(var i=0;i<20;i++) {
                try { 
			await uamazon.page.click('//i[contains(@class,"a-icon-section-expand")]/..', { timeout :100})
			await utils.wait(1000, amazon);
		} catch(e) {
			break; 
		}
	} 

	for(var j=0;j<20;j++) {
		try {
			await amazon.page.waitForSelector('//*[@id="message-area-'+j+'"]', { timeout : 100} )
			console.log('gifTextareaEle', j);
		        await utils.wait(1000, amazon);

        		await amazon.page.evaluate((element, value) => {
		            	console.log(value, document.querySelector(element));
        	    		document.querySelector(element).value = value;
        		}, '#message-area-'+j , body);

			await utils.clearInput(amazon, '#gift-message-sender-input-' + j , 1000)
			await utils.wait(500, amazon);
		        await amazon.page.type('#gift-message-sender-input-' + j, from, { delay: 50 });
			await utils.wait(500, amazon);


		} catch (e) { 
			console.log(e)
			break; }
	}

	await utils.click(amazon,amazon.element.saveGiftOption,1000);
	await utils.wait(4000, amazon);
	await utils.click(amazon,amazon.element.Continue,1000);
	await utils.wait(2000, amazon);
//	await utils.click(amazon,amazon.element.continueDelivery,1000);
//	await utils.click(amazon,amazon.element.continueDeliveryNew,1000);

        await utils.wait(4000, amazon);
	await utils.click(amazon, amazon.element.addNewPaymentMethod, 1000);
        await utils.wait(4000, amazon);
	await utils.click(amazon, amazon.element.addCreditCard, 1000);
	await utils.wait(4000, amazon);
	await amazon.setCreditCard();
	await utils.click(amazon, amazon.element.paymentContinue,1000);
        await utils.wait(4000, amazon);
	await utils.click(amazon, amazon.element.placeYourOrder, 1000);
	await utils.wait(4000, amazon);
	await utils.click(amazon, amazon.element.reviewOrder, 1000);
	await utils.wait(4000, amazon);
	await utils.click(amazon, amazon.element.trackShipment, 1000);
        await utils.wait(4000, amazon);
	return amazon.page.url()
    },

    setCreditCard: async () => {
	await amazon.page.waitForSelector(amazon.element.nameOnCard)


        await amazon.page.type(amazon.element.nameOnCard, amazon.parameters.buyer.nameOnCard, { delay: 50 });
        await amazon.page.type(amazon.element.cardNumber, amazon.parameters.buyer.cardNumber, { delay: 50 });
	var expMonth = await amazon.page.waitForSelector(amazon.element.selectExpMonth);
	expMonth.select(amazon.parameters.buyer.expireMonth);
	var expYear = await amazon.page.waitForSelector(amazon.element.selectExpYear);
        expYear.select(amazon.parameters.buyer.expireYear)
	await utils.click(amazon, amazon.element.addYourCard, 1000)
        await utils.wait(3000, amazon);
    },

    closeTryAppModal: async () => {
	console.log('closeTryAppModal')
	await utils.click(amazon, amazon.element.closeAppModal, 1000)
    },

    home: async () => {
        try {
            await amazon.page.waitForSelector(1000);
            await amazon.page.waitForSelector(amazon.element.home);
            await amazon.page.evaluate((element) => {
                const homeEle = document.evaluate(element.home, document, null, XPathResult.ANY_TYPE, null);
                const home = homeEle.iterateNext();
                home && home.click();
            }, amazon.element);
        }
        catch (err) {
            console.error(err);
        }
    }

}

module.exports = amazon;
