import Vue from "vue";
import Router from "vue-router";
import Test from "./views/MyTest.vue";
import TaskIndex from "@/pages/task/TaskIndex.vue";
import TaskCreate from "@/pages/task/TaskCreate.vue";
import UserIndex from "@/pages/user/UserIndex.vue";
import UserCreate from "@/pages/user/UserCreate.vue";
import CategoryIndex from "@/pages/category/CategoryIndex.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {path: '/', component: TaskIndex},
    {path: '/task/create', component: TaskCreate},

    {path: '/user/index', component: UserIndex},
    {path: '/user/create', component: UserCreate},

    {path: '/category/index', component: CategoryIndex},
    
    {path: '/mytest', component: Test},
    {path: '*', redirect: '/'},
  ]
});
