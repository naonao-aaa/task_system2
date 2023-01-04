import Vue from 'vue'
import axios from 'axios';
import App from './App.vue'
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
