export default {
    install: (app) => {  
      // Axios
      const axios = app.config.globalProperties.$axios;
      const store = app.config.globalProperties.$store;
      // VueCookies
      const cookies = app.config.globalProperties.$cookies;
  
      // Setting
      async function isLogined() {
        if(cookies.get('x-token') === undefined) {
          return false;
        } else if (store.state.accountInfo === undefined) {
          // Send request to server to check token
          try {
            const accountInfo = await axios.post('/users/get', {});
            store.commit('setAccountInfo', accountInfo[0]);
            return true;
          } catch (error) {
            cookies.remove('x-token');
            return false;
          }
        } else {
          return true;
        }
        // return true;
      }
      
      function resetLogined() {
        cookies.remove('x-token');
        store.commit('setAccountInfo', undefined);
      }
      
      // Provide
      app.config.globalProperties.$isLogined = isLogined;
      app.config.globalProperties.$resetLogined = resetLogined;
    }
  }