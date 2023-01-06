import Vue from "vue";
import Router from "vue-router";
import Test from "./views/MyTest.vue";
import TaskIndex from "@/pages/task/TaskIndex.vue";
import TaskCreate from "@/pages/task/TaskCreate.vue";
import UserIndex from "@/pages/user/UserIndex.vue";
import UserCreate from "@/pages/user/UserCreate.vue";
import CategoryIndex from "@/pages/category/CategoryIndex.vue";
import CategoryCreate from "@/pages/category/CategoryCreate.vue";
import CategoryEdit from "@/pages/category/CategoryEdit.vue";
import CategoryDestroy from "@/pages/category/CategoryDestroy.vue";
import StatusIndex from "@/pages/status/StatusIndex.vue";
import StatusCreate from "@/pages/status/StatusCreate.vue";
import StatusEdit from "@/pages/status/StatusEdit.vue";
import StatusDestroy from "@/pages/status/StatusDestroy.vue";



Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {path: '/', component: TaskIndex},
    {path: '/task/create', component: TaskCreate},

    {path: '/user/index', component: UserIndex},
    {path: '/user/create', component: UserCreate},

    {path: '/category/index', component: CategoryIndex, name: 'CategoryIndex'},
    {path: '/category/create', component: CategoryCreate, name: 'CategoryCreate'},
    {path: '/category/edit/:id', component: CategoryEdit, name: 'CategoryEdit'},
    {path: '/category/destroy/:id', component: CategoryDestroy, name: 'CategoryDestroy'},

    {path: '/status/index', component: StatusIndex, name: 'StatusIndex'},
    {path: '/status/create', component: StatusCreate, name: 'StatusCreate'},
    {path: '/status/edit/:id', component: StatusEdit, name: 'StatusEdit'},
    {path: '/status/destroy/:id', component: StatusDestroy, name: 'StatusDestroy'},
    
    {path: '/mytest', component: Test},
    {path: '*', redirect: '/'},
  ]
});
