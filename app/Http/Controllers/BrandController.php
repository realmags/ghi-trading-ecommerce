<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;

class BrandController extends Controller
{
    /*
    * @desc fetch all brand records
    */
    public function index() {
        $brands = Brand::select('brand_id', 'brand_name')
                    ->get();

        return $brands->toJson();
    }

    public function store(Request $request) {
        $brand = Brand::create($request->all());

        return \response()->json([
            'data' => $brand,
            'message' => 'New brand record added.'
        ], 200);
    }
}
