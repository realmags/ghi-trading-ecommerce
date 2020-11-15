<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /*
    * @desc fetch all category records
    */
    public function index() {
        $categories = Category::select('category_id', 'category_name')
                                ->get();

        return $categories->toJson();
    }
}
