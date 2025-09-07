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

Route::get('test', function () {
    dd([
        'APP_URL' => config('app.url'),
        'ASSET_URL' => config('app.asset_url'),
        'url()' => url('/flashcards'),
        'asset()' => asset(''),
        'isProduction' => app()->isProduction(),
        'isLocal' => app()->isLocal(),
        'environment' => app()->environment(),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    // notes
    Route::get('notes', [NoteController::class, 'index'])->name('notes.index');
    Route::post('notes', [NoteController::class, 'store'])->name('notes.store');
    Route::put('notes/{note}', [NoteController::class, 'update'])->name('notes.update');
    // flashcards
    Route::get('flashcards', [FlashCardController::class, 'index'])->name('flashcards.index');
    Route::post('flashcards', [FlashCardController::class, 'store'])->name('flashcards.store');
    Route::put('flashcards/{flashcard}', [FlashCardController::class, 'update'])->name('flashcards.update');
    Route::post('flashcards/{flash_card}/review', [FlashCardController::class, 'review'])->name('flashcards.review');
    // reviews
    Route::get('reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::post('reviews/{review}/grade', [ReviewController::class, 'grade'])->name('reviews.grade');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
