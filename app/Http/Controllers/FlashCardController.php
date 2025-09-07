<?php

namespace App\Http\Controllers;

use App\Models\FlashCard;
use App\Models\FlashcardTag;
use App\Models\Review;
use App\Models\Tag;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class FlashCardController extends Controller
{
    //
    public function index(): Response
    {
        return Inertia::render('flashcards', [
            'flashcards' => FlashCard::where('user_id', Auth::user()->id)->with(['tags'])->get()->toArray(),
            'availableTags' => Tag::all(),
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'question' => 'required|max:255',
            'answer' => 'required|max:255',
            'tag' => 'required|max:255',
        ]);

        try {
            DB::transaction(function () use ($request, $user) {
                $tag = Tag::firstOrCreate([
                    'title' => ucfirst($request->input('tag')),
                ]);

                $flashcard = FlashCard::create([
                    'user_id' => $user->id,
                    'question' => $request->input('question'),
                    'answer' => $request->input('answer'),
                ]);

                FlashcardTag::create([
                    'flash_card_id' => $flashcard->id,
                    'tag_id' => $tag->id,
                ]);

                Review::create([
                    'user_id' => $user->id,
                    'flashcard_id' => $flashcard->id,
                    'review_date' => now(),
                    'due_at' => now()->addDay(),
                ]);
            });
        } catch (Exception $e) {
            Log::error('Failed to create flashcard', [
                'exception' => $e->getMessage(),
            ]);
        }

        return redirect('/flashcards');
    }

    public function update(FlashCard $flashcard, Request $request)
    {
        $user = Auth::user();

        try {
            $flashcard->update([
                'answer' => $request->input('answer'),
                'question' => $request->input('question'),
            ]);

            $tag = Tag::where(
                'title', ucfirst($request->input('tag'))
            )->first();

            FlashcardTag::firstOrCreate([
                'flash_card_id' => $flashcard->id,
                'tag_id' => $tag->id,
            ]);
        } catch (Exception $e) {
            Log::error('Failed to update flashcard', [
                'exception' => $e->getMessage(),
            ]);

            return response('Failed to update flashcard', 500);
        }

        return back()->with('success', 'Operation completed successfully');
    }

    public function review(FlashCard $flash_card, Request $request)
    {
        $fcReview = Review::firstOrCreate([
            'user_id' => Auth::user()->id,
            'flashcard_id' => $flash_card->id,
        ]);

        $fcReview->update([
            'due_at' => now(),
            'review_date' => now(),
        ]);

        return redirect('/reviews');
    }
}
