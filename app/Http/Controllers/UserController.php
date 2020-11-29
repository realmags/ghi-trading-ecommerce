<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;

class UserController extends Controller
{
    public function index(){

        $users = Users::all();

        return $users->toJson();
        //return view('/account/manage_account', ['users' => $users]);
    }

    public function store(Request $request) {

        /*$user = new Users();

        $user->user_code = request('code');
        $user->first_name = request('firstName');
        $user->last_name = request('lastName');
        $user->username = request('username');
        $user->password = request('password');

        $user->save();

        return redirect('/account/manage')->with('mssg', 'Account Created!');*/

        $validatedData = $request -> validate([
            'firstName' => 'required',
            'lastName' => 'required',
        ]);

        $user = Users::create([
            'firstName' => $validatedData['firstName'],
            'lastName' => $validatedData['lastName']
        ]);

        return response()->json('Account Created!');
    }
}
