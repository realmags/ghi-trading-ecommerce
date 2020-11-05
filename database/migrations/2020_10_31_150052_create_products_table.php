<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\SoftDeletes;

class CreateProductsTable extends Migration
{
    use SoftDeletes;
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            // table options
            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';

            // table columns
            $table->bigIncrements('product_id');
            // TODO: add foreign key for category id
            $table->string('category_id', 100);
            $table->foreign('category_id')->references('category_id')->on('categories');
            // TODO: add foreign key for brand id
            $table->string('brand_id', 100);
            $table->foreign('brand_id')->references('brand_id')->on('brands');

            $table->string('product_name', 100);
            $table->unsignedFloat('unit_price');
            $table->boolean('is_available'); // TODO: add default value ->default(0)
            $table->text('product_description');
            $table->string('product_image', 255); //TODO: add default url for product image
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
