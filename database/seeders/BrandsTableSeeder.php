<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $brands = ['phillips', 'boysen', 'xiaomi'];
        foreach ($brands as  $brand) {
            Brand::create([
                'brand_id' => $brand,
                'brand_name' => \ucfirst($brand)
            ]);
        }
    }
}
