<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function login() {
        // $users = User::
        $username = $request->input('username');
        $password = $request->input('password');

        return ['username'=>$username];
    }
}
