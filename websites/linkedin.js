const li = {

	elements: {
		signInButton: '//*[@id="app__container"]/main/div/div[2]/form/div[3]/button',
		newPostButton: '//*[@id="share-prompt-link"]',
		likeButton: '//*[@id="reactions-list"]/div[1]/button',
		profileButton: 'a[title="Profile"]',
		username: 'input[id="username"]',
		password: 'input[id="password"]'
	},

	utils: null,
	page: null,
	username: null,

	open: async () => {
		await li.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
	},

	checkLogin: async () => {
		try {
			await li.page.waitForSelector(li.elements.profile, { timeout: 10000 });
			return true
		} catch (e) {
			return false
		}
	},

	getUsername: async() => {

	      const elementHandles = await li.page.$$(li.elements.profileButton);

	      const propertyJsHandles = await Promise.all(
      			elementHandles.map(handle => handle.getProperty('href'))
    	      );
    	      
              const hrefs2 = await Promise.all(
      	      		propertyJsHandles.map(handle => handle.jsonValue())
    	      );
	
	      li.username = hrefs2[0].replace('https://www.linkedin.com/mwlite/in/','');
	      console.log("logged in user:", li.username);
	},

	login: async (username, password) => {
		console.log('login...')
		var element = li.elements.profileButton

		try {
			await li.page.waitForSelector(element, { timeout: 10000 });
			await li.getUsername();	
			return { "status": "Logged In" }
		} catch (e) {
			console.log('Logging in...')
		}

		try {
			console.log('waiting for:', element);

			if (username && password) {
				try {
					const loginButton = await li.page.$x(li.elements.signInButton);
					await loginButton[0].click();
				} catch (e) {
					var x = li.catchError(); if (x) { return x; }
				}
				await li.page.waitForSelector(1000);

				await li.page.type(li.elements.username, username, { delay: 50 });
				await li.page.type(li.elements.password, password, { delay: 50 });

				const loginButton2 = await li.page.$x(elements.loginButton2);
				await loginButton2[0].click();
				try {
					await li.page.waitForSelector(element, { timeout: 300000 });
					await li.getUsername();
					return { "status": "Logged In" }
				} catch (e) {
					return 'Does not logged in';
				}
			}

			await li.page.waitForSelector(element, { timeout: 300000 });
			await li.getUsername();
			return { "status": "Logged In" }
		} catch (e) {
			console.log("Login Failed");
			console.log(e)
			var x = li.catchError(); if (x) { return x; }
		}
	},

	catchError: async () => {
		await li.utils.log({ "message": "Login Error" });
		return { "status": "Login Error" }
	},

	mainFeedLike: async (viewStoriesCount) => {
		await li.page.waitForSelector(2000);
		let article = null;
                let count = 0;
		try {
			while (viewStoriesCount > count) {
				console.log(count + 1);

				if (count === 0) {
					article = await li.page.$('ol#feed-container > li.feed-item');

					const totalArticle = (await li.page.$$('ol#feed-container > li.feed-item')).length;

					if (totalArticle === 0) {
						break;
					}

					await li.page.evaluate((ele) => {
						ele.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					}, article);

					await li.likePostByArticleNode(article);
					count++;
				} else {
					try {
						article = await li.page.evaluateHandle(el => el.nextElementSibling, article);
					} catch(e) {
						article = await li.page.$('ol#feed-container > li.feed-item');
	                                        const totalArticle = (await li.page.$$('ol#feed-container > li.feed-item')).length;
					}

					if (!article) {
						break;
					}

					const type = await article.evaluate(node => node.tagName);

					if (type === 'LI') {
						await li.page.evaluate((ele) => {
							ele.scrollIntoView({
								behavior: 'smooth',
								block: 'start'
							});
						}, article);

						await li.likePostByArticleNode(article);

						count++;
					} else {
						console.log('skip node other then li element');
					}
				}

				await li.utils.sleep(2000);
			}
		
		} catch (e) { console.log(e) }
		await li.utils.sleep(2000);
		return ('script is finished ok, liked:' + count + ' articles')
	},

	likePostByArticleNode: async (element) => {
		try {
			await li.utils.sleep(1500);
			const likeButtonXpath = await li.createXPathFromElement(element) + '/section/div[2]/button[1]';
			const [likeButtonOuter] = await li.page.$x(likeButtonXpath);
			if (likeButtonOuter) {
				await likeButtonOuter.click();
				await li.utils.sleep(1200);
				const [likeButtonInner] = await li.page.$x(li.elements.likeButton);
				if (likeButtonInner) {
					await likeButtonInner.click();
				}
			let log = await li.utils.log({ "message": "like", "linkedin": li.username, "url": li.page.url() });
			}
		} catch (e) {
			await li.utils.log({ "error": "likePostByArticleNode", "url": li.page.url(), "error": e });
		}

		return;
	},

	createXPathFromElement: async (ele) => {
		return await li.page.evaluate((element) => {
			const idx = (sib, name) => sib
				? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name)
				: 1;
			const segs = elm => !elm || elm.nodeType !== 1
				? ['']
				: elm.id && document.getElementById(elm.id) === elm
					? [`id("${elm.id}")`]
					: [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
			return segs(element).join('/');
		}, ele);
	}

};

module.exports = li;
