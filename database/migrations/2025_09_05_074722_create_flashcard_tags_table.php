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
        Schema::create('flashcard_tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('flash_card_id');
            $table->unsignedBigInteger('tag_id');
            $table->timestamps();

            $table->foreign('flash_card_id')->references('id')->on('flash_cards');
            $table->foreign('tag_id')->references('id')->on('tags');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flashcard_tags');
    }
};
