<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::post('auth/registration','Auth\AuthController@registration');
Route::post('auth/login', 'Auth\AuthController@login');
Route::post('auth/google/login', 'Auth\AuthController@signInSocialNetwork');
Route::post('auth/facebook/login', 'Auth\AuthController@signInSocialNetwork');
Route::get( 'auth/chanSendLetterForChangePass/{email}', 'Auth\AuthController@sendLetterForChangePassword');
Route::post('auth/checkTokenUser', 'Auth\AuthController@checkTokenUser');
Route::post('auth/newPassword', 'Auth\AuthController@newPassword');

Route::post('auth/token', 'Api\Auth\DefaultController@authenticate');
Route::post('auth/refresh', 'Api\Auth\DefaultController@refreshToken');

Route::middleware('auth:api')->group(function() {
    Route::group(['prefix' => 'user'], function() {
        Route::get('getUser', 'API\UserController@get');
        Route::post('uploadPhoto', 'API\UserController@uploadPhoto');
        Route::get('deletePhoto', 'API\UserController@deletePhoto');
        Route::put('editUser', 'API\UserController@edit');
        Route::post('changePassword', 'API\AuthController@changePassword');
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/logout', 'Auth\AuthController@logout')->name('logout');
});

Route::group(['prefix' => 'product'], function() {
    Route::get('list', 'API\ProductController@get');
    Route::get('getOneProduct/{id}', 'API\ProductController@getOneProduct');
    Route::get('allCategories', 'API\ProductController@getAllCategories');
    Route::get('allAuthor', 'API\ProductController@getAllAuthors');

});


