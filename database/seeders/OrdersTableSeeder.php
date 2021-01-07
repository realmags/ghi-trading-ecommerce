<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        $staff = [
            'admin',
            'service crew',
            'sales clerk'
        ];
        $status = [
            'REJECTED',
            'COMPLETED',
            'PENDING'
        ];
        $option = [
            'DELIVERY',
            'PICKUP'
        ];

        for ($i=0; $i < 10; $i++) {
            Order::create([
                'fulfilled_by' => \rand(1, 5),
                'order_status' => $status[\rand(0,2)],
                'receiving_option' => $option[\rand(0,1)]
            ]);
        }
    }
}
