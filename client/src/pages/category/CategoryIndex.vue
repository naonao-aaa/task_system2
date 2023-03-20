<template>
    <div class="card">
        <div class="card-header">カテゴリー管理画面</div>

        <div class="card-body">

            <button v-if="loginUser.admin == true" v-on:click="create" class="btn btn-outline-primary">
                新規登録
            </button>

            <table class="table table-hover my-2">
                <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">カテゴリ名</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">更新日</th>
                    </tr>
                </thead>
                <tbody v-for="category in afterSliceCategoriesForPaginate" :key="category.id">
                <tr>
                    <th>{{category.id}}</th>
                    <td>{{category.name}}</td>
                    <td><button v-if="loginUser.admin == true" class="btn btn-outline-success" @click="goEdit(category.id)">編集</button></td>
                    <td><button v-if="loginUser.admin == true" class="btn btn-outline-danger" @click="goDestroy(category.id)">削除</button></td>
                    <td>{{category.updated_at}}</td>
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
        categories() {
            return this.$store.getters.categoryList;
        },
        loginUser() {
            return this.$store.getters.loginUser;
        },
        afterSliceCategoriesForPaginate() {
            let current = this.currentPage * this.perPage;
            let start = current - this.perPage;
            return this.categories.slice(start, current);
        },
        getPageCount() {
            //console.log(this.computedTasks.length);
            return Math.ceil(this.categories.length / this.perPage);
        }
    },
    created() {
        this.$store.dispatch('updateCategoryList');
    },
    methods: {
        create() {
            this.$router.push({
                name: "CategoryCreate"
            });
        },
        goEdit(id) {
            this.$router.push({
                name: "CategoryEdit",
                params: { id: id}
            })
        },
        goDestroy(id) {
            this.$router.push({
                name: "CategoryDestroy",
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
