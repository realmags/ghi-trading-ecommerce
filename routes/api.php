<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;

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
* @desc fetch all category records
*/
Route::get('categories/', [CategoryController::class, 'index']);

/*
* @desc fetch all product records according to category
* paginated
*/
Route::get('products/category/{category_id}', [ProductController::class, 'all']);

/*
* @desc fetch a single product record
*/
Route::get('products/item/{product_id}', [ProductController::class, 'single']);

/*
* @desc insert new product record
*/
Route::post('products/item/add/', [ProductController::class, 'store']);

/*
* @desc update a product record
*/
Route::put('products/item/update/{product_id}', [ProductController::class, 'update']);

/*
* @desc delete a product record
*/
Route::delete('products/item/delete/{product_id}', [ProductController::class, 'delete']);

/*
* @desc fetch all bestsellers
TODO: CREATE BESTSELLERS FUNCTION IN PRODUCT CONTROLLER
*/
Route::get('products/bestsellers/', [ProductController::class, 'bestsellers']);