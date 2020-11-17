const ig = {

  elements: {
    mainMenu: '//*[contains(text(),"Main Menu")]',
  },

  utils: null,
  page: null,
  username: null,

  login: async () => {
    console.log('login...')
    var element = ig.elements.mainMenu

    try {
      console.log('waiting for:', element);
      const profile = await ig.page.waitForSelector(element, { timeout: 300000 });
      return { "status": "Logged In" }
    } catch (e) {
      console.log("Login Failed");
      console.log(e)
      var x = ig.catchError(); if (x) { return x; }
    }
  }

};

module.exports = ig;
