<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use \DB;

class ProductController extends Controller
{
    // TODO: HANDLE ERRORS

    /*
    * @desc fetch product info based off search query
    */
    public function index() {
        $keyword = request('search');
        $query_limit = 10;

        $products = Product::select('product_id', 'category_name', 'brand_name', 'product_name')
                            ->join('categories', 'products.category_id', '=', 'categories.category_id')
                            ->join('brands', 'products.brand_id', '=', 'brands.brand_id')
                            ->where('product_name', 'like', "%$keyword%")
                            ->orWhere('category_name', 'like', "%$keyword%")
                            ->orWhere('brand_name', 'like', "%$keyword%")
                            ->limit($query_limit)
                            ->get();

        return $products->toJson();
    }

    /*
    * @desc fetch all products according to category, paginated
    */
    public function all($category_id) {
        $query_limit = 10;
        $products = Product::select('product_id', 'category_name', 'brand_name', 'product_name', 'is_available', 'unit_price', 'product_description', 'product_image')
                            ->join('categories', 'products.category_id', '=', 'categories.category_id')
                            ->join('brands', 'products.brand_id', '=', 'brands.brand_id')
                            // ->whereRaw("category_id = $category_id AND is_available = true")
                            // ->whereRaw("`product`.`category_id` = `$category_id` AND `is_available` = true")
                            ->where([
                                ['products.category_id', '=', $category_id],
                                ['is_available', '=', true]
                            ])
                            ->paginate($query_limit);

        return $products->toJson();
    }

    /*
    * @desc fetch a single product record
    */
    public function single($product_id) {
        $product = Product::join('categories', 'products.category_id', '=', 'categories.category_id')
                            ->join('brands', 'products.brand_id', '=', 'brands.brand_id')
                            ->findOrFail($product_id);

        return $product->toJson();
    }

    /*
    * @desc insert a single product record
    */
    public function store(Request $request) {
        $product = Product::create($request->all());

        return \response()->json([
            'message' => "New product record added.",
            'data' => $product
        ], 200);
    }

    /*
    * @desc update a single product record
    */
    public function update(Request $request, $product_id) {
        $product = Product::findOrFail($product_id);
        $product->update($request->all());

        return \response()->json([
            'message' => "Product with ID $product_id updated.",
            'data' => $product,
            'request' => $request->all()
        ], 200);
    }

    /*
    * @desc delete a single product record
    */
    public function delete($product_id) {
        $product = Product::findOrFail($product_id);
        $product->delete();

        return \response()->json([
            'message' => "Product with ID $product_id deleted."
        ], 200);
    }

    /*
    * @desc delete a single product record
    TODO: TEST API
    */
    public function bestsellers() {
        $bestsellers = [];
        $query = DB::table('product_orders')
                        // ->select('*')
                        ->select('product_orders.product_id',
                        // 'products.product_name',
                        // 'categories.category_name',
                        // 'brands.brand_name',
                        // 'products.product_image',
                        DB::raw('SUM(product_orders.item_qty) AS items_sold'))
                        ->join('orders', 'product_orders.order_id', '=', 'orders.order_id')
                        ->join('products', 'product_orders.product_id', '=', 'products.product_id')
                        // ->join('brands', 'products.brand_id', '=', 'brands.brand_id')
                        // ->join('categories', 'products.category_id', '=', 'categories.category_id')
                        ->where('orders.order_status', '=', 'COMPLETED')
                        ->groupBy('product_orders.product_id')
                        ->get();

        foreach ($query as $item) {
            $product = \json_decode(\json_encode($item), true);
            $product_id = $product['product_id'];
            $items_sold = $product['items_sold'];
            $product_details = Product::select('product_id', 'category_name', 'brand_name', 'product_name', 'product_image')
                                    ->join('categories', 'products.category_id', '=', 'categories.category_id')
                                    ->join('brands', 'products.brand_id', '=', 'brands.brand_id')
                                    ->where('product_id', '=', $product_id)
                                    ->get();
            $array_to_push = $product_details->toArray()[0];
            $array_to_push['items_sold'] = \intval($items_sold);
            \array_push($bestsellers, $array_to_push);
        }
        // dump($bestsellers);
        // dump(json_encode($bestsellers));
        // return $query->toJson();
        return \json_encode($bestsellers);
    }
}
