<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $dueReviewsQuery = FacadesAuth::user()->reviews()->whereDate('due_at', Carbon::now())->with(['flashcard', 'flashcard.tags']);

        return Inertia::render('dashboard', [
            'streak' => Auth::user()->streak,
            'due_today_count' => (clone $dueReviewsQuery)->count(),
            'due_today_overview' => (clone $dueReviewsQuery)->take(5)->get(),
            'xp' => Auth::user()->xp_events()->sum('amount'),
        ]);
    }
}
