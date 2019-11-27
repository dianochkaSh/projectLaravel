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
Route::get('auth/logout', 'Auth\AuthController@logout');

Route::post('auth/token', 'Api\Auth\DefaultController@authenticate');
Route::post('auth/refresh', 'Api\Auth\DefaultController@refreshToken');


