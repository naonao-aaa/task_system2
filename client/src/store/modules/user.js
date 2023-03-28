import axios from 'axios';
import store from '../index.js';

const state = {
    userList: [],
};

const getters = {
    userList: state => state.userList,
};

const mutations = {
    updateUserList(state, newUserList) {
        state.userList = newUserList;
    },
};

const actions = {
    updateUserList({ commit }) {
        axios.get(
            '/api/user/index',
            {
                headers: {
                    Authorization: `Bearer ${store.getters.loginUserToken}`,
                }
            }
        )
        .then(response => {
            console.log(response);
            const newUserList = response.data.users;
            commit('updateUserList', newUserList);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}
