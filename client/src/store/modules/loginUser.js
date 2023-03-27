import axios from 'axios';
import router from '../../router.js';

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
        const loginUserInLocalStorage = JSON.parse(localStorage.getItem('loginUserInLocalStorage'));
        if (!loginUserInLocalStorage) return;
        commit('updateLoginUser', loginUserInLocalStorage);

        const loginUserTokenInLocalStorage = localStorage.getItem('loginUserTokenInLocalStorage');
        if (!loginUserTokenInLocalStorage) return;
        commit('updateLoginUserToken', loginUserTokenInLocalStorage);
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

              const jsonNewLoginUser = JSON.stringify(response.data.user);
              localStorage.setItem('loginUserInLocalStorage', jsonNewLoginUser);

              const newLoginUserToken = response.data.access_token;
              commit('updateLoginUserToken', newLoginUserToken);
              localStorage.setItem('loginUserTokenInLocalStorage', newLoginUserToken);

              commit('updateLoginErrorMessages', null);

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
        localStorage.removeItem('loginUserInLocalStorage');
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

          const jsonNewLoginUser = JSON.stringify(response.data.user);
          localStorage.setItem('loginUserInLocalStorage', jsonNewLoginUser);
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
