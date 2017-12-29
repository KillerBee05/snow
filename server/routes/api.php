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
//Add User
Route::post('/user', [
  'uses' => 'UserController@postUser'
]);

// Authenticate User
Route::post('/authenticate', [
  'uses' => 'AuthController@authUser'
]);

Route::get('/user', [
  'uses' => 'UserController@getUsers'
]);

Route::put('/user', [
  'uses' => 'UserController@putUser'
]);

Route::delete('/user', [
  'uses' => 'UserController@deleteUser'
]);
