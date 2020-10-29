<?php

use Illuminate\Support\Facades\Route;

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

// Edit this section for customer routes
Route::get('/', function () {
    return view('welcome');
});


// Edit this section for admin routes
Route::get('/admin', function () {
    return ['result' => 'This is the main page of the ecommerce site'];
});


// Edit this section for sales clerk routes
Route::get('/clerk', function () {
    return ['result' => 'This is the main page of the ecommerce site'];
});
