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
        $brands = [
            'Ace',
            'Lifetime',
            'Omni',
            'Dowell',
            'Bosch',
            'Firefly',
            'Dewalt',
            'Coleman',
            'Asahi'
        ];

        foreach ($brands as $brand) {
            Brand::create([
                'brand_name' => \ucfirst($brand)
            ]);
        }
    }
}
