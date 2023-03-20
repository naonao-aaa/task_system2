import Vue from "vue";
import Router from "vue-router";
import store from './store';
import TaskIndex from "@/pages/task/TaskIndex.vue";
import TaskCreate from "@/pages/task/TaskCreate.vue";
import TaskShow from "@/pages/task/TaskShow.vue";
import TaskEdit from "@/pages/task/TaskEdit.vue";
import TaskDestroy from "@/pages/task/TaskDestroy.vue";
import UserIndex from "@/pages/user/UserIndex.vue";
import UserCreate from "@/pages/user/UserCreate.vue";
import UserEdit from "@/pages/user/UserEdit.vue";
import PasswordEdit from "@/pages/user/PasswordEdit.vue";
import UserDestroy from "@/pages/user/UserDestroy.vue";
import CategoryIndex from "@/pages/category/CategoryIndex.vue";
import CategoryCreate from "@/pages/category/CategoryCreate.vue";
import CategoryEdit from "@/pages/category/CategoryEdit.vue";
import CategoryDestroy from "@/pages/category/CategoryDestroy.vue";
import StatusIndex from "@/pages/status/StatusIndex.vue";
import StatusCreate from "@/pages/status/StatusCreate.vue";
import StatusEdit from "@/pages/status/StatusEdit.vue";
import StatusDestroy from "@/pages/status/StatusDestroy.vue";
import MyLogin from "@/pages/auth/MyLogin.vue";



Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    //ログイン
    {path: '/login', component: MyLogin, name: "MyLogin"},

    //タスク
    {path: '/task/index', component: TaskIndex, name: "TaskIndex"},
    {path: '/task/create', component: TaskCreate, name: "TaskCreate"},
    {path: '/task/show/:id', component: TaskShow, name: "TaskShow"},
    {path: '/task/edit/:id', component: TaskEdit, name: "TaskEdit"},
    {path: '/task/destroy/:id', component: TaskDestroy, name: "TaskDestroy"},

    //ユーザー
    {path: '/user/index', component: UserIndex, name: "UserIndex"},
    {
      path: '/user/create', 
      component: UserCreate, 
      name: "UserCreate",
      beforeEnter(to, from, next) {
        if(store.getters.loginUser.admin == true) {    //管理者権限
          next();
        } else {  
          next('/user/index');
        }
      }
    },
    {
      path: '/user/edit/:id', 
      component: UserEdit, 
      name: "UserEdit",
      beforeEnter(to, from, next) {
        if(store.getters.loginUser.admin == true) {    //管理者権限
          next();
        } else if (to.params.id != store.getters.loginUser.id) {   //ログインユーザーと一致しない時
          next('/user/index');
        }
        next();
      },
    },
    {
      path: '/user/edit/password/:id', 
      component: PasswordEdit, 
      name: "PasswordEdit",
      beforeEnter(to, from, next) {
        if(store.getters.loginUser.admin == true) {    //管理者権限
          next();
        } else if (to.params.id != store.getters.loginUser.id) {    //ログインユーザーと一致しない時
          next('/user/index');
        }
        next();
      }
    },
    {
      path: '/user/destroy/:id', 
      component: UserDestroy, 
      name: 'UserDestroy',
      beforeEnter(to, from, next) {
        if(store.getters.loginUser.admin == true) {    //管理者権限
          next();
        } else if (to.params.id != store.getters.loginUser.id) {    //ログインユーザーと一致しない時
          next('/user/index');
        }
        next();
      }
    },

    //カテゴリー
    {path: '/category/index', component: CategoryIndex, name: 'CategoryIndex'},
    {
      path: '/category/create', 
      component: CategoryCreate, 
      name: 'CategoryCreate',
      beforeEnter(to, from, next) {
        if(store.getters.loginUser.admin == true) {    //管理者権限
          next();
        } else {  
          next('/category/index');
        }
      }
    },
    {
      path: '/category/edit/:id', 
      component: CategoryEdit, 
      name: 'CategoryEdit',
      beforeEnter(to, from, next) {
        if(store.getters.loginUser.admin == true) {    //管理者権限
          next();
        } else {  
          next('/category/index');
        }
      }
    },
    {
      path: '/category/destroy/:id', 
      component: CategoryDestroy, 
      name: 'CategoryDestroy',
      beforeEnter(to, from, next) {
        if(store.getters.loginUser.admin == true) {    //管理者権限
          next();
        } else {  
          next('/category/index');
        }
      }
    },

    //ステータス
    {path: '/status/index', component: StatusIndex, name: 'StatusIndex'},
    {
      path: '/status/create', 
      component: StatusCreate, 
      name: 'StatusCreate',
      beforeEnter(to, from, next) {
        if(store.getters.loginUser.admin == true) {    //管理者権限
          next();
        } else {  
          next('/status/index');
        }
      }
    },
    {
      path: '/status/edit/:id', 
      component: StatusEdit, 
      name: 'StatusEdit',
      beforeEnter(to, from, next) {
        if(store.getters.loginUser.admin == true) {    //管理者権限
          next();
        } else {  
          next('/status/index');
        }
      }
    },
    {
      path: '/status/destroy/:id', 
      component: StatusDestroy, 
      name: 'StatusDestroy',
      beforeEnter(to, from, next) {
        if(store.getters.loginUser.admin == true) {    //管理者権限
          next();
        } else {  
          next('/status/index');
        }
      }
    },
    

    //その他
    {path: '*', redirect: '/login'},
  ]
});
