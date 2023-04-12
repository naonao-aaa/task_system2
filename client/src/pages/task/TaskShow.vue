<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">タスク詳細画面</div>

                <div class="card-body">
                        <div class="card">
                            <div class="card-header">
                                <h4>{{task.name}}</h4>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr class="table-active">
                                    <th scope="col">id</th>
                                    <th scope="col">優先度</th>
                                    <th scope="col">ステータス</th>
                                    <th scope="col">担当者</th>
                                    <th scope="col">登録者</th>
                                    <th scope="col">カテゴリ</th>
                                    <th scope="col">期日</th>
                                    <th scope="col">進捗率</th>
                                    <th scope="col">工数</th>
                                    <th scope="col">更新日時</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-active">
                                    <td>{{task.id}}</td>
                                    <td>{{task.priority}}</td>
                                    <td>{{task.status ? task.status.name : ''}}</td>
                                    <td>{{task.work_user ? task.work_user.name : ''}}</td>
                                    <td>{{task.admin_user ? task.admin_user.name : ''}}</td>
                                    <td>{{task.category ? task.category.name : ''}}</td>
                                    <td v-if="task.deadline">{{task.deadline | moment}}</td>
                                    <td v-else></td>
                                    <td>{{task.progress}}</td>
                                    <td>{{task.man_hours}}</td>
                                    <td>{{task.updated_at | moment_HH_mm}}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="card-body">
                                <p class="card-text newline">{{task.description}}</p>

                                <div v-for="file in files" :key="file.id">
                                    <a v-if="loginUserId == file.user_id" @click="fileDestroy(file.id)" href="javaScript:void(0)" class="btn btn-outline-danger btn-sm mt-1 py-0">削除</a>
                                    <a href="javaScript:void(0)" @click="getMimeType(file)" class="mx-1">{{ file.original_name}}</a>
                                </div>

                            </div>
                            <div class="card-footer text-muted">
                                <!--ログインユーザーが、タスク登録者 または タスク担当者 または 管理者権限ユーザーの時 に、編集ボタンが表示されるように。-->
                                <button v-if="loginUserId == task.admin_user.id || loginUserId == task.work_user.id || loginUser.admin == true" class="btn btn-outline-success" @click="goEdit(task.id)">編集</button>
                                <!--ログインユーザーが、タスク登録者 または 管理者権限ユーザーの時 に、削除ボタンが表示されるように。-->
                                <button v-if="loginUserId == task.admin_user.id || loginUser.admin == true" class="btn btn-outline-danger mx-4" @click="goDestroy(task.id)">削除</button>
                            </div>
                        </div>

                        <!--ログインユーザーがタスク登録者または管理者権限ユーザーの時に表示。-->
                        <select v-if="loginUserId == task.admin_user.id || loginUser.admin == true" class="mt-2 mx-1" v-model="workUserId" v-on:change="changeWorkUser">
                            <option value="0" selected>担当者変更</option>
                            <option v-for="user in users" :key="user.id" :value="user.id">{{user.name}}</option>
                        </select>
                        <!--ログインユーザーがタスク担当者または管理者権限ユーザーの時に表示。-->
                        <select v-if="loginUserId == task.work_user.id || loginUser.admin == true" class="mt-2 mx-1" v-model="statusId" v-on:change="changeStatus">
                            <option value="0" selected>ステータス変更</option>
                            <option v-for="status in statuses" :key="status.id" :value="status.id">{{status.name}}</option>
                        </select>

                        <!--{{comments}}-->
                        <div class="mt-2">
                            <div class="card" v-for="comment in comments" :key="comment.id">
                                <div class="card-header text-muted" style="position: relative;">
                                    <div style="display: inline;">投稿者：{{ comment.user ? comment.user.name : ''}}</div>
                                    <div style="display: inline; position: absolute; right: 15px;">{{ comment.created_at | moment_HH_mm }}</div>
                                </div>
                                <div class="card-body">
                                    <p class="card-text newline">{{comment.text}}</p>
                                    <template v-if="comment.files">
                                        <div v-for="file in comment.files" :key="file.id">
                                            <a href="javaScript:void(0)" @click="getMimeType(file)">{{file.original_name}}</a>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>

                        <br>
                        <div method="POST" action="#" enctype="multipart/form-data">
                            <textarea class="form-control" rows="5" name="comment" v-model="comment" placeholder="こちらにコメントを入力してください！"></textarea>
                            <!--{{comment}}-->
                            <input type="hidden" name="user" v-model="loginUserId">
                            <input class="mt-1 mx-1" type="file" name="file" multiple v-on:change="fileSelected">
                            <br>
                            
                            <template v-if="filesInfo.length >= 2">
                                <div v-for="file in filesInfo" :key="file.id">
                                {{file.name}}
                                </div>
                            </template>
                            
                            <button class="btn btn-dark mt-1" @click="commentSubmit">投稿する</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { saveAs } from 'file-saver';

export default {
    data() {
        return {
            comment: '',
            workUserId: '0',
            statusId: '0',
            filesInfo: [],
            commentId: '',
            mimeType: '',
            fileId: '',
            fileOriginalName: '',
        };
    },
    computed: {
        task() {
            const dataId = parseInt(this.$route.params.id, 10);
            //const dataId = this.$route.params.id;
            const data = this.$store.getters.taskList.find(a => (
                a.id === dataId
            ));
            console.log(data);
            return data;
        },
        comments() {
            return this.$store.getters.commentList;
        },
        users() {
            return this.$store.getters.userList;
        },
        statuses() {
            return this.$store.getters.statusList;
        },
        loginUserId() {
            return this.$store.getters.loginUser.id;
        },
        loginUser() {
            return this.$store.getters.loginUser;
        },
        files() {
            return this.$store.getters.fileList;
        },
    },
    created() {
        this.$store.dispatch('updateTaskList');
        this.$store.dispatch('updateCommentList', this.$route.params.id);
        this.$store.dispatch('updateUserList');
        this.$store.dispatch('updateStatusList');
        this.$store.dispatch('updateFileList', this.$route.params.id);
        //console.log(typeof this.$route.params.id);
    },
    filters: {
        moment: function (date) {
            return moment(date).format('YYYY/MM/DD');
        },
        moment_HH_mm: function (date) {
            return moment(date).format('YYYY/MM/DD HH:mm');
        }
    },
    methods: {
        goEdit(id) {
            this.$router.push({
                name: "TaskEdit",
                params: { id: id}
            })
        },
        goDestroy(id) {
            this.$router.push({
                name: "TaskDestroy",
                params: { id: id}
            })
        },
        commentSubmit() {
            axios.post(
                '/api/comment/store',
                {
                    comment: this.comment,
                    user_id: this.loginUserId,
                    task_id: this.task.id
                }
            )
            .then(response => {
                console.log(response);
                this.comment = '';

                if(response.data.commentId) {
                    this.commentId = response.data.commentId;
                }

                if(this.filesInfo.length != 0) {
                    this.fileUpload(this.commentId);
                } else {
                    this.$router.go({path: this.$router.currentRoute.path, force: true});
                }
            })
            .catch(error => {
                if(this.filesInfo.length != 0) {
                    this.fileUpload(this.commentId);
                } else {
                    console.log(error);
                }
            })
        },
        changeWorkUser() {
            axios.post(
                '/api/comment/workUserUpdate',
                {
                    task: this.task,
                    workUserId: this.workUserId
                }
            )
            .then(() => {
                const workUser = this.$store.getters.userList.find(a => (
                    a.id == this.workUserId
                ));
                this.comment = `担当者を【${workUser.name}】に変更しました。`;
                this.commentSubmit();
            })
            .catch( err => console.log(err) );
        },
        changeStatus() {
            axios.post(
                '/api/comment/statusUpdate',
                {
                    task: this.task,
                    statusId: this.statusId
                }
            )
            .then(() => {
                const status = this.$store.getters.statusList.find(a => (
                    a.id == this.statusId
                ));
                this.comment = `ステータスを【${status.name}】に変更しました。`;
                this.commentSubmit();
            })
            .catch( err => console.log(err) );
        },

        fileSelected(event){
            //console.log(event);
            const ObjectFilesInfo = event.target.files;
            const ArrayFilesInfo = Object.values(ObjectFilesInfo);    //オブジェクトはmap処理やforEach処理を使えないので、1度配列にする。
            this.filesInfo = ArrayFilesInfo;
            console.log(this.filesInfo);
        },
        fileUpload(commentId){
            const formData = new FormData();

            this.filesInfo.forEach((file, index) => {
                formData.append(`files[${index}]`, file) // formDataに追加していく
            });

            formData.append('taskId',this.task.id);
            formData.append('admin_user',this.loginUserId);
            formData.append('commentId',commentId);
            formData.append('fromComment',true);

            console.log(...formData.entries());

            axios.post(
                '/api/file/fromComment/upload',
                formData
            )
            .then(response =>{
                console.log(response);

                this.$router.go({path: this.$router.currentRoute.path, force: true});
            })
            .catch(error => {
                console.log(error);
            })
        },

        getMimeType(file) {
            this.fileId = file.id;
            this.fileOriginalName = file.original_name;

            axios.post(
                '/api/file/getMimeType',
                {
                    file_id: this.fileId
                },
            )
            .then((response) => {
                console.log(response);
                this.mimeType = response.data.mimeType;
                this.fileDownload();
            })
        },
        fileDownload() {
            axios.post(
                '/api/file/download',
                {
                    file_id: this.fileId
                },
                {
                    responseType: "blob",
                }
            )
            .then(response => {
                console.log(response);
                
                const name = this.fileOriginalName;
                const blob = new Blob([response.data], { type: this.mimeType });
                saveAs(blob, name);
            })
            .catch(error => {
                console.log(error);
            });
        },
/*         
        downloadByURL(url, fileName) {
            const link = document.createElement('a')
            link.download = fileName;        //同一オリジンではないからだと思われるが、download属性が機能してくれない。。
            link.href = url
            link.target = "_blank"
            link.click()
        },
 */
        fileDestroy(fileId){
            axios.post(
                '/api/file/destroy',
                {
                    file_id: fileId
                },
            )
            .then(response => {
                console.log(response);
                this.$router.go({path: this.$router.currentRoute.path, force: true});
            })
            .catch(error => {
                console.log(error);
            });
        }

    },
}
</script>

<style>
.newline {
  white-space: pre-wrap;
}
</style>
