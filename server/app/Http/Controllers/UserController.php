<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function postUser(Request $request){
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

    public function getUsers(){

    }

    public function putUser(Request $request, $id){

    }

    public function deleteUser($id){

    }
}
