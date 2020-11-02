<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;

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

// TODO: make route for creating new product record

/*
* @desc fetch all product records according to category
*/
Route::get('/products/', [ProductController::class, 'show']);

/*
* @desc update a product record
*/
Route::put('/products/', [ProductController::class, 'update']);

/*
* @desc delete a product record
*/
Route::delete('/products/', [ProductController::class, 'delete']);

/*
* @desc fetch all bestsellers
*/
Route::delete('/products/bestsellers/', [ProductController::class, 'bestsellers']);