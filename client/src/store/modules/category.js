import axios from 'axios';
import store from '../index.js';

const state = {
    categoryList: [],
};

const getters = {
    categoryList: state => state.categoryList,
};

const mutations = {
    updateCategoryList(state, newCategoryList) {
        state.categoryList = newCategoryList;
    },
};

const actions = {
    updateCategoryList({ commit }) {
        console.log(store.getters.loginUserToken);

        axios.get(
            '/api/category/index'
        )
        .then(response => {
            console.log(response);
            const newCategoryList = response.data.categories;
            commit('updateCategoryList', newCategoryList);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}
