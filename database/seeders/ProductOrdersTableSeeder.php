<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductOrder;

class ProductOrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        for($i = 0; $i < 10; $i++) {
            ProductOrder::create([
                'order_id' => \rand(3, 10),
                'product_id' => \rand(1, 10),
                'item_qty' => \rand(1, 5),
                'item_subtotal' => $faker->randomFloat($nbMaxDecimals = 2, $min = 10, $max = 500)
            ]);
        }
    }
}
