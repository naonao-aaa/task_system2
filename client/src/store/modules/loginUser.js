import axios from 'axios';
import router from '../../router.js';
import store from '../index.js';

const state = {
    loginUser: null,
    loginErrorMessages: null,
    loginUserToken: null
};

const getters = {
    loginUser: state => state.loginUser,
    loginErrorMessages: state => state.loginErrorMessages,
    loginUserToken: state => state.loginUserToken
};

const mutations = {
    updateLoginUser(state, newLoginUser) {
        state.loginUser = newLoginUser;
    },
    updateLoginErrorMessages(state, newLoginErrorMessages) {
        state.loginErrorMessages = newLoginErrorMessages;
    },
    updateLoginUserToken(state, newLoginUserToken) {
        state.loginUserToken = newLoginUserToken;
    },
};

const actions = {
    autoLogin({commit}) {

        const loginUserTokenInLocalStorage = localStorage.getItem('loginUserTokenInLocalStorage');
        if (!loginUserTokenInLocalStorage) return;
        commit('updateLoginUserToken', loginUserTokenInLocalStorage);

        //必要
        axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.loginUserToken}`; 

        console.log('autoLogin');

        axios.get(
            '/api/reload/getUserInfo'
        )
        .then(response => {
            const reloadedLoginUser = response.data.userFromToken;
            commit('updateLoginUser', reloadedLoginUser);
        })
        .catch(error => {
            console.log(error);
        })

    },
    login({ commit }, loginData) {
        axios.post(
            '/api/auth/login',
            {
                loginData: loginData
            }
        )
        .then(response => {
          if(response.data.status == "OK") {
              const newLoginUser = response.data.user;
              commit('updateLoginUser', newLoginUser);

              const newLoginUserToken = response.data.access_token;
              commit('updateLoginUserToken', newLoginUserToken);
              //ローカルストレージには、tokenのみを保存する。（Vuexは好きに使って良いけど）
              localStorage.setItem('loginUserTokenInLocalStorage', newLoginUserToken);

              commit('updateLoginErrorMessages', null);

              //main.jsで記述すると、手動でリロードしてmain.jsを再度読み込ませないと、ログイン前に読み込んだmain.jsのstore.getters.loginUserToken（null）が用いられてしまうので、この部分でも記述するべき。
              //ただ、この記述だけだと、逆に手動でリロードしたした時におかしくなるので、main.jsでも書く必要があると思う。
              axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.loginUserToken}`; 

              router.push({
                  name: "TaskIndex"
              });

          } else {
              console.log('Failed');
              const newLoginErrorMessages = response.data.errorMessages;
              commit('updateLoginErrorMessages', newLoginErrorMessages);
          }
        })
        .catch(error => {
            console.log(error);
            const newLoginErrorMessages = ['メールアドレスまたはパスワードが正しくありません。'];
            commit('updateLoginErrorMessages', newLoginErrorMessages);
        });
    },
    logout({ commit }) {
        commit('updateLoginUser', null);

        localStorage.removeItem('loginUserTokenInLocalStorage');
        router.replace('/login');
    },
    updateLoginUser({ commit }, updateDataId) {
      axios.post(
          '/api/auth/update',
          {
              updateDataId: updateDataId
          }
      )
      .then(response => {
          console.log(response);
          const newLoginUser = response.data.user;

          commit('updateLoginUser', newLoginUser);

          //const jsonNewLoginUser = JSON.stringify(response.data.user);
          //localStorage.setItem('loginUserInLocalStorage', jsonNewLoginUser);
/*
          router.push({
              name: "UserIndex"
          });
*/
      });
  }
};

export default {
    state,
    getters,
    mutations,
    actions
}
