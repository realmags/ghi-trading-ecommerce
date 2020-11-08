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

/*
* @desc fetch product info based off search query
*/
Route::get('products/', [ProductController::class, 'index']);

/*
* @desc fetch all product records according to category
* paginated
*/
Route::get('products/{category_id}', [ProductController::class, 'show']);

/*
* @desc insert new product record
*/
Route::post('products/item/', [ProductController::class, 'store']);

/*
* @desc update a product record
*/
Route::put('products/item/{product_id}', [ProductController::class, 'update']);

/*
* @desc delete a product record
*/
Route::delete('products/item/{product_id}', [ProductController::class, 'delete']);

/*
* @desc fetch all bestsellers
*/
Route::get('products/bestsellers/', [ProductController::class, 'bestsellers']);