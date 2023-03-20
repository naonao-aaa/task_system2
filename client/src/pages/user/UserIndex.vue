<template>
    <div class="card">
        <div class="card-header">ユーザー管理画面</div>

        <div class="card-body">

          <button v-if="loginUser.admin == true" v-on:click="create" class="btn btn-outline-primary">
              新規登録
          </button>

          <table class="table table-hover my-2">
              <thead>
                  <tr>
                  <th scope="col">id</th>
                  <th scope="col">ユーザー名</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">更新日</th>
                  </tr>
              </thead>
              <tbody v-for="user in afterSliceUsersForPaginate" :key="user.id">
                <tr>
                  <th>{{user.id}}</th>
                  <td>{{user.name}}</td>
                  <td><button v-if="loginUser.id == user.id || loginUser.admin == true" class="btn btn-outline-success" @click="goEdit(user.id)">編集</button></td>
                  <td><button v-if="loginUser.id == user.id || loginUser.admin == true" class="btn btn-outline-danger" @click="goDestroy(user.id)">削除</button></td>
                  <td>{{user.updated_at}}</td>
                </tr>
              </tbody>
          </table>

            <VuePaginate
                :page-count="getPageCount"
                :page-range="3"
                :margin-pages="2"
                :click-handler="clickCallback"
                :prev-text="'＜'"
                :next-text="'＞'"
                :container-class="'pagination'"
                :page-class="'page-item'"
                :page-link-class="'page-link'"
                :prev-class="'page-item'"
                :prev-link-class="'page-link'"
                :next-class="'page-item'"
                :next-link-class="'page-link'">
            </VuePaginate>
            
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            currentPage: 1,
            perPage: 10,
        };
    },
    computed: {
        users() {
            return this.$store.getters.userList;
        },
        loginUser() {
            return this.$store.getters.loginUser;
        },
        afterSliceUsersForPaginate() {
            let current = this.currentPage * this.perPage;
            let start = current - this.perPage;
            return this.users.slice(start, current);
        },
        getPageCount() {
            //console.log(this.computedTasks.length);
            return Math.ceil(this.users.length / this.perPage);
        }
    },
    created() {
        this.$store.dispatch('updateUserList');
    },
    methods: {
        create() {
            this.$router.push({
                name: "UserCreate"
            });
        },
        goEdit(id) {
            this.$router.push({
                name: "UserEdit",
                params: { id: id}
            })
        },
        goDestroy(id) {
            this.$router.push({
                name: "UserDestroy",
                params: { id: id}
            })
        },
        clickCallback(pageNum) {
            this.currentPage = Number(pageNum);
        }
    }
}
</script>

<style>

</style>
