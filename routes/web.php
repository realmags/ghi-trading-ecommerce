<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::view('/{path?}', 'app');

/*Route::get('/account/manage', [UserController::class,'index']);

Route::get('/account/create', function () {
    return view('account/create_account');
});

Route::post('/account/manage', [UserController::class,'store']);*/