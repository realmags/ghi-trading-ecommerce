<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function show() {
        /*
        * @desc fetch all products according to category
        */
        $category = \request('category');

        // TODO: fetch product records from database

        // TODO: handle errors for non-existent resource

        return \response()->json([
            'index' => $category
        ], 200);
    }

    public function update() {
        /*
        * @desc update a single product record
        */
        $product_id = \request('product_id');

        // TODO: update a product record

        // TODO: handle errors for non-existent resource

        return \response()->json([
            'update' => $product_id
        ], 200);
    }

    public function delete() {
        /*
        * @desc delete a single product record
        */
        $product_id = \request('product_id');

        // TODO: update a product record

        // TODO: handle errors for non-existent resource

        return \response()->json([
            'message' => 'product deleted'
        ], 204);
    }
}
