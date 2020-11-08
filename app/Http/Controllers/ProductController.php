<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /*
    * @desc fetch product info based off search query
    */
    public function index() {
        $keyword = request('search');

        $products = Product::select('product_id', 'category_name', 'brand_name', 'product_name')
                            ->join('categories', 'products.category_id', '=', 'categories.category_id')
                            ->join('brands', 'products.brand_id', '=', 'brands.brand_id')
                            // ->where([
                            //     ['products.category_id', '=', $category_id],
                            //     ['is_available', '=', true]
                            // ])
                            ->where('product_name', 'like', "%$keyword%")
                            ->orWhere('category_name', 'like', "%$keyword%")
                            ->orWhere('brand_name', 'like', "%$keyword%")
                            ->get();

        return $products->toJson();
    }

    /*
    * @desc fetch all products according to category, paginated
    */
    public function show($category_id) {
        /*
        ! fetch product records from database
        * resolved
        ! test out update api route
        * works as intended
        * think about adding limit to query result
        */
        $query_limit = 10;
        $products = Product::select('product_id', 'category_name', 'brand_name', 'product_name', 'unit_price', 'product_description', 'product_image')
                            ->join('categories', 'products.category_id', '=', 'categories.category_id')
                            ->join('brands', 'products.brand_id', '=', 'brands.brand_id')
                            // ->whereRaw("category_id = $category_id AND is_available = true")
                            // ->whereRaw("`product`.`category_id` = `$category_id` AND `is_available` = true")
                            ->where([
                                ['products.category_id', '=', $category_id],
                                ['is_available', '=', true]
                            ])
                            ->paginate($query_limit);

        // TODO: handle errors for non-existent resource

        // return \response()->json([
        //     'data' => $products
        // ], 200);
        return $products->toJson();
    }

    /*
    * @desc add a single product record
    */
    public function store(Request $request) {
        $product = Product::create($request->all());

        /*
        ! create a product record
        * resolved
        ! test out update api route
        * works as intended
        */
        return \response()->json([
            'message' => "Product has been added to the database.",
            'data' => $product
        ], 200);
    }

    /*
    * @desc update a single product record
    */
    public function update(Request $request, $product_id) {
        /*
        ! update a product record
        * resolved
        ! test out update api route
        * works as intended
        */
        $product = Product::findOrFail($product_id);
        $product->update($request->all());

        // TODO: handle errors for non-existent resource

        return \response()->json([
            'message' => "Product with ID $product_id has been updated.",
            'data' => $product,
            'request' => $request->all()
        ], 200);
    }

    /*
    * @desc delete a single product record
    */
    public function delete($product_id) {
        /*
        ! delete a product record
        * resolved
        ! test out delete api route
        */
        $product = Product::findOrFail($product_id);
        $product->delete();

        /*
        ! handle errors for non-existent resource
        */

        return \response()->json([
            'message' => "Product with ID $product_id has been deleted."
        ], 204);
    }
}
