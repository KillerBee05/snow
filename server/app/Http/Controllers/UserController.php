<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use JWTAuth;

class UserController extends Controller
{
    public function createUser(Request $request){
      // $this->validate($request, [
      //   'name' => 'required',
      //   'email' => 'required|email|unique:users',
      //   'username' => 'required',
      //   'password' => 'required'
      // ]);
      //
      // $user = new User([
      // 'name' => $request->input('name'),
      // 'email' => $request->input('email'),
      // 'username' => $request->input('username'),
      // 'password' => bcrypt($request->input('password'))
      // ]);

      $user = new User();
      $user->name = $request->input('name');
      $user->email = $request->input('email');
      $user->username = $request->input('username');
      $user->password = bcrypt($request->input('password'));
      if($user == '' || null){
        return response()->json(['user' => $user, 'success' => false, 'msg' => 'Failed to save User Data']);
      } else{
        $user->save();
        return response()->json(['user' => $user, 'success' => true, 'msg' => 'User Data saved'], 201);
      }
    }

    public function signIn(Request $request){

      $this->validate($request, [
        'email' => 'required',
        'password' => 'required'
      ]);
      
      $credentials = $request->only('email', 'password');
      try {
        if(!$token = JWTAuth::attempt($credentials)){
          return response()->json([
            'success' => false, 'error' => 'Invalid credentials'
          ]);
        }
      } catch (JWTException $e){
        return response()->json([
          'error' => 'Could not create Token'
        ], 500);
      }
      return response()->json([
        'success' => true, 'token' => $token
      ], 200);
    }

    public function getUsers(){

    }

    public function putUser(Request $request, $id){

    }

    public function deleteUser($id){

    }
}
