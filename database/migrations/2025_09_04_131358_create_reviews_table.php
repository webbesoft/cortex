<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('flashcard_id');
            $table->unsignedBigInteger('user_id');
            $table->date('review_date');
            $table->integer('quality')->default(5);
            $table->float('ease_factor')->default(2.5);
            $table->integer('interval')->default(1);
            $table->date('due_at');
            $table->timestamps();

            $table->foreign('flashcard_id')->references('id')->on('flash_cards');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
