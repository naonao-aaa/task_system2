<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/mytest', function () {
    return response()->json([
        'person' => ['name' => '太郎', 'kana' => 'タロウ'],
    ]);
});

Route::group(['prefix' => 'category'], function () {
    Route::get('index', 'CategoryController@index')->name('category.index');
});


Route::get('/userIndex', 'UserController@index')->name('user.index');
