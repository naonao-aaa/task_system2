<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-info">
          <div class="card-header">カテゴリー新規作成画面</div>

          <div class="card-body">
              カテゴリ名<br>
              <input type="text" class="form-control" name="category_name" v-model="createCategoryData.category_name">
              <br>

              <div v-if="$v.category_name.$dirty">
                <div class="error" v-if="!$v.category_name.required">カテゴリ名は必須入力です。</div>
              </div>
       
              <ul>
                  <div v-for="error in errors.category_name" :key="error.id">
                      <li class="errorMessage">{{error}}</li>
                  </div>
              </ul>
              <br>
              <button class="btn btn-info" @click="register">登録する</button>
              <!-- {{createCategoryData}} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
//const { required } = window.validators
import { required } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            createCategoryData: {
                category_name: '',
            },
            errors: {
                category_name: [],
            }
        };
    },

    validations: {
        category_name: {
            required,
        },
    },

    methods: {
        register() {
            axios.post(
                '/api/category/store',
                {
                    category_name: this.createCategoryData.category_name
                },
            )
            .then(response => {
                console.log(response);
                this.$router.push({
                    name: "CategoryIndex"
                });
            })
            .catch(error => {
                console.log(error.response.data.errors.category_name);
                if(error.response.data.errors.category_name) {
                  const errorsCategoryName = error.response.data.errors.category_name;
                  this.errors.category_name = errorsCategoryName.map((error) => {
                      return error
                  })
                }
            });

            this.createCategoryData.category_name = '';
        },

        status(validation) {
            return {
                error: validation.$error,
                dirty: validation.$dirty
            }
        }
     
    },
}
</script>

<style>
</style>
