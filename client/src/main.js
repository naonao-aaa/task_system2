import Vue from 'vue'
import axios from 'axios';
import App from './App.vue'
import router from "./router";
import store from "./store/index.js";
// bootstrap-vueからBootstrapVue,IconPluginをインポートする
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Bootstrap と BootstrapVueのCSSファイルをインポート（順序はBootstrap⇒BootstrapVue）
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VuePaginate from 'vuejs-paginate';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.component('VuePaginate', VuePaginate);

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = "http://127.0.0.1:8000";

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
