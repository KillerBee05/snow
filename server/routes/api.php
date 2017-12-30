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
//Create User
Route::post('/user', [
  'uses' => 'UserController@createUser'
]);

// Authenticate User
Route::post('/user/signIn', [
  'uses' => 'UserController@signIn'
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
