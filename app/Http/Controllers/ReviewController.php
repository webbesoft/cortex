<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Services\SpacedRepetitionService;
use App\Services\StreakService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    //
    public function index(): Response
    {
        $user = Auth::user();

        $dueReviews = $user->reviews()->whereDate('due_at', Carbon::now())->with(['flashcard'])->get();

        return Inertia::render('reviews', [
            'due_reviews' => $dueReviews
        ]);
    }

    public function grade(Review $review, Request $request)
    {
        $request->validate([
            'quality_choice' => 'required|integer:strict'
        ]);

        $review = SpacedRepetitionService::processReview($review, $request->input('quality_choice'), Auth::user()->id);
        StreakService::updateUserStreak(Auth::user());
    }
}
