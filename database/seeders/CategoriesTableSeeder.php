<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = ['paints', 'screws', 'electrical'];
        foreach ($categories as  $category) {
            Category::create([
                'category_id' => $category,
                'category_name' => \ucfirst($category)
            ]);
        }
    }
}
