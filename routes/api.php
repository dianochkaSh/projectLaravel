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
Route::post('auth/google/login', 'Auth\AuthController@signInGoogle');

Route::post('auth/token', 'Api\Auth\DefaultController@authenticate');
Route::post('auth/refresh', 'Api\Auth\DefaultController@refreshToken');

Route::middleware('auth:api')->group(function() {
    Route::group(['prefix' => 'user'], function() {
        Route::get('getUser', 'User\UserController@get');
        Route::post('uploadPhoto', 'User\UserController@uploadPhoto');
        Route::get('deletePhoto', 'User\UserController@deletePhoto');
        Route::put('editUser', 'User\UserController@edit');
        Route::post('changePassword', 'Auth\AuthController@changePassword');
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/logout', 'Auth\AuthController@logout')->name('logout');
});


