<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('order_id');
            // TODO: add foreign key for customer id
            // $table->unsignedBigInteger('customer_id');
            // $table->foreign('customer_id')->references('customer_id')->on('customers');
            $table->unsignedInteger('fulfilled_by');
            $table->enum('order_status',['REJECTED','COMPLETED','PENDING']);
            $table->enum('receiving_option',['DELIVERY','PICKUP']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
