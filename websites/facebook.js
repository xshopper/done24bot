const ig = {

  elements: {
    mainMenu: '//*[contains(text(),"Main Menu")]',


    wait: '//body[contains(@class,"wait-60-sec")]',
    error: '//body[contains(@class,"p-error")]',
    Instagram: '//img[@alt ="Instagram"]',
    loginButton1: '//*[contains(text(), "Log In")]',
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    postCommentInput: 'textarea[aria-label="Add a comment…"]',
    postCommentSubmit: '//*[@id="react-root"]/section/main/section/div/form/button',
    loginButton2: '//button/div[contains(text(), "Log In")]',
    removeAccountButton: '//button[contains(text(), "Remove Account")]',
    removeButton: '//button[text()= "Remove"]',
    searchButton: '//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[2]/a',
    activityButton: '//*[@aria-label="Activity"]/..',
    activityText: '//h1[contains(text(),"Activity")]/..',
    profileButton: '//*[@aria-label="Profile"]',
    profileText: '//h1[contains(text(),"Profile")]',
    followingText: '//main//div[contains(text(),"Following")]',
    hashtagsText: '//main//span[contains(text(),"Hashtags")]',
    searchBar: 'input[placeholder="Search"]',
    newPostButton: '//*[contains(@aria-label,"New Post")]',
    saveLoginInfo: '//*[contains(text(),"Save Info")]',
    //firstSearchResult: 'ul > li:first-child > a',
    correctSearchResult: '/html/body/div[1]/section/main/div/div/div/ul/li[1]/a/div/div[2]/div[1]/div/div',
    messagegButton: '//div/button[contains(text(), "Message")]',
    textArea: 'textArea',
    sendMessage: '//div/button[contains(text(), "Send")]',
    followButton: '//button[text() = "Follow"]',
    followBackButton: '//button[text() = "Follow Back"]',
    followingButton: '//*[text() = "Following" or @aria-label="Following"]',
    unfollowButton: '//button[text() = "Unfollow"]',
    profile: '//*[contains(@aria-label,"Profile")]',
    cancelButton: '//button[contains(text(),"Cancel")]',
    xButtonFindMore: '//*[contains(@class,"glyphsSpriteGrey_Close")]',
    addPhoneNumber: '//h2[contains(text(),"Add Your Phone Number")]',
    getApp: '//h1[contains(text(),"Get the Instagram App")]',
    notNowLink: '//a[contains(text(),"Not Now")]',
    addInstagramToHome: '//*[contains(text(),"Add Instagram to your Home screen?")]',
    turnOnNotifications: '//*[contains(text(),"Turn on Notifications")]',
    notNowButton: '//button[contains(text(),"Not Now")]',
    homeButton: '//a//span[@aria-label="Home"]',
    directMsgButton: '//a//span[@aria-label="Direct"]',
    directMsgReqButton: '//*[@id="react-root"]/section/div[2]/div/div/div[2]/div/div[1]/button',
    messageRequests: '//h1[contains(text(),"Message Requests")]',
    directMsgReqLists: '//*[@id="react-root"]/section/div[2]/div/div[2]/a',
    allow: '//div[contains(text(),"Allow")]',
    backLink: '//*[@aria-label="Back"]',
    disabledAccount: '//p[contains(text(),"Your account has been disabled for violating our terms")]',
    suspiciousLoginAttempt: '//*[contains(text(), "Suspicious Login Attempt")]',
    actionBlocked: '//*[contains(text(), "Action Blocked")]',
    temporaryBlocked: '//*[contains(text(), "Temporarily Blocked")]',
    couldNotComment: '//*[contains(text(),"Couldn\'t post comment")]',
    reportProblem: '//*[contains(text(), "Report a Problem")]',
    following: '//*[contains(@href, "following")]',
    followers: '//*[contains(@href, "followers")]',
    see_all_followers: '//*[contains(text(), "See All Followers")]',
    followingItem: '//a[contains(@href,"/")]',
    hashtagItem: '//a[contains(@href,"explore") and contains(@href,"tags")]',
    profileMedia: '//a[contains(@href,"/p/")]',
    postUnfilledHeart: '//*[@aria-label="Like" and contains(@height,"24")]/..',
    postFilledHeart: '//*[@aria-label="Unlike" and contains(@height,"24")]/..',
    postComment: '//*[@aria-label="Comment"]/..',
    postUser: '//article//header//a',
    textPhoto: '//h1[text()="Photo" or text()="Post" or text()="Video"]',
    textComments: '//h1[text()="Comments"]',
    commentLike: '//*[@aria-label="Like" and contains(@height,"12")]/..',
    commentViewReplies: '//*[contains(text(),"View replies")]/..',
    profileFollowUnfollowtext: '//button[contains(text(),"Follow") or contains(text(),"Following") or contains(text(),"Message") or contains(text(),"Edit Profile")]',
    profilePostsNr: '//span//span[contains(.,"posts")]/span',
    profileFollowersNr: '//span/following-sibling::text()[contains(.,"followers")]/../span',
    profileFollowingNr: '//span/following-sibling::text()[contains(.,"following")]/../span',
    profileUsername: '//nav//header//h1',
    usernameFromPost: '//*[@id="react-root"]//a[@href=concat("/" , text(), "/")]',
    isPrivate: '//*[contains(text(),"This Account is Private")]',
    notAvailableText: '//h2[contains(text(),"Sorry, this page isn\'t available.")]',
    videoControl: '//div[@aria-label="Control"]',
    viewerJSON: '//script[contains(text(),"window._sharedData = ")]/text()'
  },

  utils: null,
  page: null,
  username: null,

  login: async (username, password) => {
    console.log('login...')
    var element = ig.elements.mainMenu

    try {
      try {
        await ig.utils.click(ig, ig.elements.loginButton1 , 500)
	console.log('Logging in...');
      } catch(e) {
	var wait = 'networkidle0';
        if(username && password) {
          wait = 3000;
        }
      	const profile = await ig.page.waitFor(element, { waitUntil: wait });
      	await ig.getViewer();
      	return { "status": "Logged In" }
      }
    } catch (e) {
      	console.log('Logging in...')
    }

    // ig.cancelMessage();

    try {
      console.log('waiting for:', element);

      if(username && password) {
	console.log('username/password login')
	var x = await ig.utils.click(ig, ig.elements.removeAccountButton , 1000)
	if (x) {
		await ig.utils.click(ig, ig.elements.removeButton , 3000)
	}
	await ig.utils.click(ig, ig.elements.loginButton1 , 5000)

   	await ig.utils.sleep(1500);
 
	await ig.page.waitFor(ig.elements.username, { timeout: 10000 });	
    	await ig.page.type(ig.elements.username, username, { delay: 50 });
        await ig.page.type(ig.elements.password, password, { delay: 50 });

	await ig.utils.click(ig, ig.elements.loginButton2 , 2000);

	await ig.page.waitFor(ig.elements.notNowButton,  { timeout: 3000 });
	await ig.utils.click(ig, ig.elements.notNowButton , 2000);
	await ig.utils.click(ig, ig.elements.notNowButton , 2000);
	await ig.utils.click(ig, ig.elements.cancelButton , 2000);
	await ig.utils.click(ig, ig.elements.notNowButton , 2000);
	await ig.utils.click(ig, ig.elements.xButtonFindMore, 2000);
	
    	try {
      		const profile = await ig.page.waitFor(element, { timeout: 300000 });
		await ig.getViewer();
      		return { "status": "Logged In" }
    	} catch (e) {
		return 'Does not logged in';
    	}		
      }

      const profile = await ig.page.waitFor(element, { timeout: 300000 });
      ig.cancelMessage();
      await ig.getViewer();
      return { "status": "Logged In" }
    } catch (e) {
      console.log("Login Failed");
      console.log(e)
      var x = ig.catchError(); if (x) { return x; }
    }
  }

};

module.exports = ig;
