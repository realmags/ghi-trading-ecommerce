<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        // create few product records
        for($i = 0; $i < 10; $i++) {
            $category = 'electrical';
            $brand = 'phillips';
            $available = true;
            if($i % 2 == 0) {
                $category = 'paints';
                $brand = 'boysen';
            }
            if($i == 1) $category = 'screws';
            if($i == 5) $category = 'screws';
            if($i == 9) {
                $available = false;
            }
            Product::create([
                'category_id' => $category,
                'brand_id' => $brand,
                'product_name' => $faker->word,
                'unit_price' => $faker->randomFloat($nbMaxDecimals = 2, $min = 10, $max = 500),
                'is_available' => $available,
                'product_description' => $faker->sentence,
                'product_image' => $faker->imageUrl
            ]);
        }
    }
}
