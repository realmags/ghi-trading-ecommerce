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
        $max_categories = 7;
        $max_brand = 9;
        $product_names = [
            'Hollow Block',
            'Deformed Bar',
            'Table Fan',
            'Face Shield',
            'Sanitizing Mat',
            'Orbit Fan',
            'Dust Extractor',
            'Screwdriver',
            'Cutter Blade',
            'Hacksaw Frame'
        ];
        $name_max = \count($product_names) - 1;

        // create few product records
        for($i = 0; $i < 10; $i++) {
            $is_available = true;
            if($i == 7) $is_available = false;
            if($i == 9) $is_available = false;

            $brand = \rand(1, $max_brand);
            $category = \rand(1, $max_categories);
            $name_index = \rand(0, $name_max);

            Product::create([
                'category_id' => $category,
                'brand_id' => $brand,
                'product_name' => $product_names[$name_index],
                'unit_price' => $faker->randomFloat($nbMaxDecimals = 2, $min = 10, $max = 500),
                'is_available' => $is_available,
                'product_description' => $faker->sentence,
                'product_image' => $faker->imageUrl
            ]);
        }
    }
}
