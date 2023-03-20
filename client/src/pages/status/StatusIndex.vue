<template>
    <div class="card">
        <div class="card-header">ステータス管理画面</div>

        <div class="card-body">

            <button v-if="loginUser.admin == true" v-on:click="create" class="btn btn-outline-primary">
                新規登録
            </button>

            <table class="table table-hover my-2">
                <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">ステータス名</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">更新日</th>
                    </tr>
                </thead>
                <tbody v-for="status in afterSliceStatusesForPaginate" :key="status.id">
                <tr>
                    <th>{{status.id}}</th>
                    <td>{{status.name}}</td>
                    <td><button v-if="loginUser.admin == true" class="btn btn-outline-success" @click="goEdit(status.id)">編集</button></td>
                    <td><button v-if="loginUser.admin == true" class="btn btn-outline-danger" @click="goDestroy(status.id)">削除</button></td>
                    <td>{{status.updated_at}}</td>
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
        statuses() {
            return this.$store.getters.statusList;
        },
        loginUser() {
            return this.$store.getters.loginUser;
        },
        afterSliceStatusesForPaginate() {
            let current = this.currentPage * this.perPage;
            let start = current - this.perPage;
            return this.statuses.slice(start, current);
        },
        getPageCount() {
            //console.log(this.computedTasks.length);
            return Math.ceil(this.statuses.length / this.perPage);
        }
    },
    created() {
        this.$store.dispatch('updateStatusList');
    },
    methods: {
        create() {
            this.$router.push({
                name: "StatusCreate"
            });
        },
        goEdit(id) {
            this.$router.push({
                name: "StatusEdit",
                params: { id: id}
            })
        },
        goDestroy(id) {
            this.$router.push({
                name: "StatusDestroy",
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
