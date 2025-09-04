<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FlashCardController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('notes', [NoteController::class, 'index'])->name('notes.index');
    Route::get('flashcards', [FlashCardController::class, 'index'])->name('flashcards.index');
    Route::get('reviews', [ReviewController::class, 'index'])->name('reviews.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
