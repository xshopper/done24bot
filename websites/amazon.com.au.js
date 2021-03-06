const BASE_URL = 'https://www.amazon.com.au';

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
    searchProductNode: '//*[@data-index="0"]//..//*[@title="product-detail"]',
    seeBuyingBtn: '//*[contains(text(),"Buy Now")]',
    addCartBtn: '//*[contains(text(),"Add to Cart")]/../input',
    checkGift: '//*[@id="sc-buy-box-gift-checkbox"]',
    checkoutBtn: '//*[@id="a-autoid-0-announce"]',
    checkoutPassword: 'input[id="ap_password"]',
    checkoutPasswordSubmit: '//*[@id="signInSubmit"]',
    deliveryAddress: '//*[contains(text(),"Delivery address")]/..//div',
    placeYourOrder: '//*[contains(text(),"Place your order")]',
    addNewAddress: '//*[contains(text(),"Add a New Address")]',
    inputFullname: 'input[id*="enterAddressFullName"]',
    inputPhoneno: 'input[id*="enterAddressPhoneNumber"]',
    inputAddress: 'input[id*="AddressLine1"]',
    inputAddress2: 'input[id*="AddressLine2"]',
    inputPostcode: 'input[id*="enterAddressPostalCode"]',
    inputCity: 'input[id*="enterAddressCityText"]',
    inputState: 'input[id*="enterAddressStateOrRegionText"]',
    submitAddress: '//input[@name="shipToThisAddress"] | //*[contains(text(),"Add address")]//..//input',
    gifTextarea: '#message-area-0',
    gifTextareaEle: '//*[@id="message-area-0"]',
    cart: '//*[@aria-label="Cart"]',
    emptyCart : '//*[(@id="nav-cart-count" or @class="nav-cart-count") and text()="0"]',
    deleteCart: '//*[contains(@class,"a-span-last")]//*[contains(text(),"Delete")]/..//input',
    deleteAddress: '//*[contains(@class,"address")]//*[contains(text(),"Delete")]/..//a',
    home: '//*[@id="nav-logo"]/a',
    closeAppModal: '//*[@id="afap-interstitial-dlg"]/div[5]/div/span/a',
    cartItemNumber: '//*[@id="nav-button-cart"]/div/span',
    saveGiftOption: '//*[contains(@class,"gift-options-button")]//input',
    addGiftOptions : '//*[contains(text(),"Add gift options")]//..',
    continueDelivery: '//*[@id="a-autoid-0"]/span/input',
    continueDeliveryNew: '//*[@id="shippingOptionFormId"]/span[1]/span/input',
    addNewPaymentMethod: '//*[contains(text(),"Add a payment method")]/../..',
    addCreditCard: '//*[contains(text(),"Add a credit or debit card")]/../..',
    paymentContinue : '//*[text()="Continue"]/../..//input',
    Continue : '//*[@value="Continue"]',
    useThisAddress : '//*[contains(text(),"Use this Address")]',
    nameOnCard: 'input[name="ppw-accountHolderName"]', //'//*[contains(@placeholder,"Name on card")]',
    cardNumber: 'input[name="addCreditCardNumber"]', //'//*[contains(@placeholder,"Card number")]',
    selectExpMonth: 'select[name="ppw-expirationDate_month"]',
    selectExpYear: 'select[name="ppw-expirationDate_year"]',
    quantity: '//*[contains(text(),"Qty:")]',
    citySuburbTown: '//*[contains(text(),"City/Suburb/Town") or contains(text(),"Choose city or suburb")]',
    addYourCard: '//*[contains(text(),"Add your card")]/..//input',
    placeYourOrder: '//*[contains(text(),"Place your order")]/..//input',
    reviewOrder: '//*[text()[contains(.,"Review")]]',
    trackShipment : '//*[text()[contains(.,"Track shipment")]]',
    amazonCartIsEmpty : '//*[contains(text(),"Your Amazon cart is empty")]',
    orderedText : '//*[contains(text(),"Ordered today")]',
    paymentMethod : '//*[contains(text(),"Payment method")]/..'
}


const amazon = {
    page: null,
    parameters : null,
    utils:null,
    element,
    querystring:null,
    url:null,

    checkLogin: async (in_timeout) => {
	console.log('checkLogin', in_timeout);
	try {
      		var signedin = await amazon.page.waitForSelector(element.signedIn, { timeout: in_timeout });
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
	
	if(username && password) {
	  console.log('username password login');
          await amazon.page.evaluate((element) => {
            const signInButtonEle = document.evaluate(element.signIn, document, null, XPathResult.ANY_TYPE, null);
            const signInButton = signInButtonEle.iterateNext();
            signInButton && signInButton.click();
          }, amazon.element);

          await amazon.page.waitForSelector(1000);

          await amazon.page.waitForSelector(amazon.element.usernameInput);
          await amazon.page.type(amazon.element.usernameInput, username, { delay: 1 });

          await amazon.page.waitForSelector(1000);

          await amazon.page.evaluate((element) => {
            const continueBtnEle = document.evaluate(element.usernameContinue, document, null, XPathResult.ANY_TYPE, null);
            const continueBtn = continueBtnEle.iterateNext();
            continueBtn && continueBtn.click();
          }, amazon.element);

          await amazon.page.waitForSelector(1000);

          await amazon.page.waitForSelector(amazon.element.passwordInput);
          await amazon.page.type(amazon.element.passwordInput, password, { delay: 1 });

          await amazon.page.waitForSelector(1000);

          await amazon.page.evaluate((element) => {
            const signInBtnEle = document.evaluate(element.signInBtn, document, null, XPathResult.ANY_TYPE, null);
            const signInBtn = signInBtnEle.iterateNext();
            signInBtn && signInBtn.click();
          }, amazon.element);

	  let x =  await amazon.checkLogin(2000)
	  return x;
	} else {
		let x = await amazon.checkLogin(6000000);
		return x;
	}

    },

    buyProducts: async (parameters) => {

	amazon.parameters = parameters;

	await amazon.home();
	await amazon.page.waitForSelector(1000);

	while (!empty) {
	        await amazon.utils.click(amazon, amazon.element.cart, 1000)
		await amazon.page.waitForSelector(1000);

		var empty = false;

		try {
			await amazon.page.waitForSelector(amazon.element.emptyCart , { timeout : 1000 })
			empty = true
		} catch (e) {
			empty = false
        		await amazon.utils.click(amazon, amazon.element.deleteCart, 1000)
			await amazon.page.waitForSelector(3000);
		}
		
		try {
                        await amazon.page.waitForSelector(amazon.element.amazonCartIsEmpty , { timeout : 1000 })
                        empty = true
		} catch(e) {}
	}
	await amazon.home();

        await amazon.page.waitForSelectorNavigation({ waitUntil: 'networkidle0' })


	for(var i=0;i<amazon.parameters.products.length;i++) {
		await amazon.utils.clearInput(amazon, amazon.element.productSearch);
       		await amazon.page.waitForSelector(amazon.element.productSearch);
		console.log("search:" , amazon.parameters.products[i].barcode);
       		await amazon.page.type(amazon.element.productSearch, amazon.parameters.products[i].barcode, { delay: 1 });
       		await amazon.page.keyboard.press('Enter');
       		await amazon.page.waitForSelector(3000);
		await amazon.utils.click(amazon, amazon.element.searchProductNode, 10000)
		await amazon.page.waitForSelector(5000);
		if(amazon.parameters.products[i].qty>1) {
			await amazon.utils.click(amazon, amazon.element.quantity, 1000)
			await amazon.page.waitForSelector(5000);
			await amazon.utils.click(amazon, '//*[contains(@data-value, \'"stringVal":"'+amazon.parameters.products[i].qty+'"\')]', 3000)
			await amazon.utils.wait(3000, amazon);
		}
		await amazon.utils.click(amazon, amazon.element.addCartBtn, 10000)
       		await amazon.page.waitForSelector(5000);
		await amazon.utils.click(amazon, amazon.element.checkGift, 10000)
        	await amazon.page.waitForSelector(1000);
	}

	console.log('checkoutBtn')
        await amazon.page.waitForSelector(amazon.element.checkoutBtn);
        await amazon.page.evaluate((element) => {
            const checkoutBtnEle = document.evaluate(element.checkoutBtn, document, null, XPathResult.ANY_TYPE, null)
            const checkoutBtn = checkoutBtnEle.iterateNext();
            checkoutBtn && checkoutBtn.click();
        }, amazon.element);

	console.log('checkoutPassword')
        try {

            await amazon.page.waitForSelector(1000);

            await amazon.page.waitForSelector(amazon.element.checkoutPassword, { timeout : 5000 });
            await amazon.page.type(amazon.element.checkoutPassword, amazon.parameters.amazon_password, { delay: 1 });

            await amazon.page.waitForSelector(1000);

            await amazon.page.waitForSelector(amazon.element.checkoutPasswordSubmit);
            await amazon.page.evaluate((element) => {
                const checkoutPasswordSubmitEle = document.evaluate(element.checkoutPasswordSubmit, document, null, XPathResult.ANY_TYPE, null)
                const checkoutPasswordSubmit = checkoutPasswordSubmitEle.iterateNext();
                checkoutPasswordSubmit && checkoutPasswordSubmit.click();
            }, amazon.element);
        } catch (err) {
            console.error("No password needed");
        }

	var addressEmpty = false;
	while (!addressEmpty) {
		try {
			if(!addressEmpty) {
			  console.log('delete address');
                          amazon.page.on('dialog', async dialog => {
				try {
                                   await dialog.accept();
				} catch(e) { }
                          });
                          addressEmpty = !await amazon.utils.click(amazon, amazon.element.deleteAddress, 1000)
                          await amazon.page.waitForSelector(3000);
			}
		} catch(e) {
			addressEmpty = true;
		}
        }
	
	try {
		await amazon.utils.wait(2000, amazon);
		await amazon.utils.click(amazon , amazon.element.addNewAddress, 5000);
        	await amazon.utils.wait(2000, amazon);	
        } catch(e) {}

	await amazon.page.waitForSelector(1000);

	console.log('inputFullname');
        await amazon.page.waitForSelector(amazon.element.inputFullname);
        await amazon.page.type(amazon.element.inputFullname, amazon.parameters.customer.name.replace("`","'").replace("???","'"), { delay: 1 , timeout : 30000 });

	console.log('inputPhoneno');
        await amazon.page.waitForSelector(amazon.element.inputPhoneno);
        await amazon.page.type(amazon.element.inputPhoneno, amazon.parameters.customer.phone, { delay: 1 });

	await amazon.page.waitForSelector(1000);

	console.log('inputAddress');
        await amazon.page.waitForSelector(amazon.element.inputAddress);
        await amazon.page.type(amazon.element.inputAddress, amazon.parameters.customer.address.replace("`","'").replace("???","'"), { delay: 1 });

	await amazon.page.waitForSelector(1000);

	console.log('inputAddress2');
        await amazon.page.waitForSelector(amazon.element.inputAddress2);
        await amazon.page.type(amazon.element.inputAddress2, amazon.parameters.customer.address2.replace("`","'").replace("???","'"), { delay: 1 });

        await amazon.page.waitForSelector(1000);

	console.log('inputPostcode');
        await amazon.page.waitForSelector(amazon.element.inputPostcode);
        await amazon.page.type(amazon.element.inputPostcode, amazon.parameters.customer.postcode, { delay: 1 });
        await amazon.page.$eval(amazon.element.inputPostcode, e => e.blur());

	await amazon.page.waitForSelector(1000);

	try {
                await amazon.page.waitForSelector(2000);
                await amazon.page.waitForSelector(amazon.element.citySuburbTown);
                await amazon.utils.click(amazon, '//select[contains(@id,"enterAddressCity")]/..//*[@role="button"]' , 1000);
                await amazon.page.waitForSelector(3000);
                await amazon.utils.click(amazon, '//a[@data-value=\'{"stringVal":"'+amazon.parameters.customer.city_original+'"}\']', 3000)
                await amazon.page.waitForSelector(3000);
        } catch(e) {
                console.log('only one city');
                console.log(e);
        }

	try {
		await amazon.utils.click(amazon, '//a[@data-value=\'{"stringVal":"'+amazon.parameters.customer.city+'"}\']', 3000)
		await amazon.page.waitForSelector(3000);
	} catch(e) {
		console.log('only one city');
		console.log(e);
	}	

//	console.log('inputCity');
//        await amazon.page.waitForSelector(amazon.element.inputCity);
//        await amazon.page.type(amazon.element.inputCity, amazon.parameters.customer.city, { delay: 1 });

//	console.log('inputState');
//        await amazon.page.waitForSelector(amazon.element.inputState);
//        await amazon.page.type(amazon.element.inputState, amazon.parameters.customer.state, { delay: 1 });

	console.log('submitAddress')
        await amazon.page.waitForSelector(amazon.element.submitAddress);
        await amazon.page.evaluate((element) => {
            const submitAddressEle = document.evaluate(element.submitAddress, document, null, XPathResult.ANY_TYPE, null)
            const submitAddress = submitAddressEle.iterateNext();
            submitAddress && submitAddress.click();
        }, amazon.element);

        let body = amazon.parameters.giftcard;
	let from = amazon.parameters.giftfrom;

	await amazon.utils.wait(3000, amazon);

	for(var i=0;i<20;i++) {
                try { 
			await uamazon.page.click('//i[contains(@class,"a-icon-section-expand")]/..', { timeout :100})
			await amazon.utils.wait(1000, amazon);
		} catch(e) {
			break; 
		}
	} 

	for(var j=0;j<20;j++) {
		try {
			await amazon.page.waitForSelector('//*[@id="message-area-'+j+'"]', { timeout : 100} )
			console.log('gifTextareaEle', j);
		        await amazon.utils.wait(1000, amazon);

        		await amazon.page.evaluate((element, value) => {
		            	console.log(value, document.querySelector(element));
        	    		document.querySelector(element).value = value;
        		}, '#message-area-'+j , body);

			await amazon.utils.clearInput(amazon, '#gift-message-sender-input-' + j , 1000)
			await amazon.utils.wait(500, amazon);
		        await amazon.page.type('#gift-message-sender-input-' + j, from, { delay: 1 });
			await amazon.utils.wait(500, amazon);


		} catch (e) { 
			console.log(e)
			break; }
	}
	

	await amazon.utils.click(amazon,amazon.element.Continue,1000);
        await amazon.utils.wait(2000, amazon);

	await amazon.utils.click(amazon,amazon.element.saveGiftOption,1000);
	await amazon.utils.wait(4000, amazon);

	var last4Digits = amazon.parameters.buyer.cardNumber.slice(-4);
	var cardSelector = '//span[@data-number="'+ last4Digits +'"]';
        var radioButton = '//div[contains(@class,"pmts-credit-card-row") and .'+ cardSelector+']';
	var a = false
	while(!a) {
		await amazon.utils.click(amazon,amazon.element.Continue,1000);
		await amazon.utils.wait(2000, amazon);

		try {
			await amazon.page.waitForSelector(cardSelector, { timeout : 100} );
			await amazon.page.evaluate((radioButton) => { 
			    	var radio = document.evaluate(radioButton, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				radio.click();
			}, radioButton); 
			a = true;
		} catch (e) {
			console.log(e)
                } 

		try {
			await amazon.utils.click(amazon,amazon.element.paymentMethod,1000);
	                await amazon.utils.wait(2000, amazon);
		} catch(e) {}
	}

	await amazon.utils.wait(2000, amazon);
	var selectorCardnumber = '//*[contains(@placeholder,"ending in '+ last4Digits +'")]';
	try {
		await amazon.page.evaluate((selectorCardnumber, cardNumber) => {
			var objCardNr = document.evaluate(selectorCardnumber, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			objCardNr.value = cardNumber;	

		}, selectorCardnumber, amazon.parameters.buyer.cardNumber)
	
		await amazon.utils.click(amazon,'//*[contains(@placeholder,"ending in ' + last4Digits + '")]/../../..//button[contains(text(),"Verify card")]',1000);
        	await amazon.utils.wait(2000, amazon);

	} catch (e) {}

	await amazon.utils.click(amazon,'//*[contains(@name,"ppw-widgetEvent:SetPaymentPlanSelectContinueEvent")]',1000);
	await amazon.utils.wait(2000, amazon);

	await amazon.utils.click(amazon,'//*[contains(text(),"Use this Address")]',1000);

        /*
	
	await amazon.utils.wait(4000, amazon);
	await amazon.utils.click(amazon, amazon.element.addNewPaymentMethod, 1000);
        await amazon.utils.wait(4000, amazon);
	await amazon.utils.click(amazon, amazon.element.addCreditCard, 1000);
	await amazon.utils.wait(4000, amazon);
	await amazon.setCreditCard();
	await amazon.utils.click(amazon, amazon.element.paymentContinue,1000);
        await amazon.utils.wait(4000, amazon);

	*/

	await amazon.utils.wait(4000, amazon);
	await amazon.utils.click(amazon, amazon.element.placeYourOrder, 1000);
	await amazon.utils.wait(8000, amazon);

	var orderId = amazon.querystring.parse(amazon.url.parse(amazon.page.url()).query).orderId
	console.log('orderId:', orderId);
	await amazon.page.goto('https://www.amazon.com.au/gp/css/summary/edit.html/ref=typ_rev_edit?ie=UTF8&orderID='+orderId);


	//await amazon.utils.click(amazon, amazon.element.reviewOrder, 1000);
	//await amazon.utils.wait(4000, amazon);
	await amazon.utils.click(amazon, amazon.element.trackShipment, 1000);
        await amazon.utils.wait(4000, amazon);

	try {
		await amazon.page.waitForSelector(amazon.element.orderedText);
		return amazon.page.url()
	} catch (e) {
		return false;
	}
    },

    setCreditCard: async () => {

	await amazon.page.evaluate((a, b) => {console.log(a,b);document.querySelector(a).value = b;}, amazon.element.nameOnCard, amazon.parameters.buyer.nameOnCard);
	await amazon.page.evaluate((a, b) => {document.querySelector(a).value = b;}, amazon.element.cardNumber, amazon.parameters.buyer.cardNumber);

	await amazon.page.evaluate((sel,value) => {
  		const example = document.querySelector(sel);
  		const example_options = example.querySelectorAll('option');
  		const selected_option = example_options.find(option => option.text === val);

  		selected_option.selected = true;
	}, amazon.element.selectExpMonth, amazon.parameters.buyer.expireMonth);


	await amazon.page.evaluate((sel,value) => {
		  const example = document.querySelector(sel);
		  const example_options = example.querySelectorAll('option');
		  const selected_option = example_options.find(option => option.text === val);

		  selected_option.selected = true;
	}, amazon.element.expireYear, amazon.parameters.buyer.expireYear);

	await amazon.utils.click(amazon, amazon.element.addYourCard, 1000)
        await amazon.utils.wait(3000, amazon);
    },

    closeTryAppModal: async () => {
	console.log('closeTryAppModal')
	await amazon.utils.click(amazon, amazon.element.closeAppModal, 1000)
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
