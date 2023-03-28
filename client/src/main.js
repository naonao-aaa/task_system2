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
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

//console.log(store.getters.loginUserToken);

store.dispatch('autoLogin');

//console.log(store.getters.loginUserToken);
axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.loginUserToken}`;  
//リロード後でないとmain.jsが読み込まれないので、各々のAPIの場所にheaderとして付与する必要があるっぽい。（ここの記述だけでは、ログイン後にリロードしないと読み込まれない）

router.beforeEach((to, from, next) => {
  console.log('globalbeforEach');
  if (store.getters.loginUser) {
      next();
  } else {
      if (to.path === "/login") {
          next();
      } else {
          next('/login');
      }
  }
});

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app');
