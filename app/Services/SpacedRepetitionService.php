<?php

namespace App\Services;

use App\Models\Review;
use App\Models\XpEvent;
use Carbon\Carbon;

class SpacedRepetitionService
{
    /**
     * Process a review: update SM-2 scheduling + log XP.
     *
     * @param  int  $quality  User rating: 0–5
     * @return array { review: Review, xp: int }
     */
    public static function processReview(Review $review, int $quality, int $userId): array
    {
        $now = Carbon::now();

        if ($review->ease_factor === null) {
            $review->ease_factor = 2.5;
        }
        if ($review->repetitions === null) {
            $review->repetitions = 0;
        }

        $xp = 0;

        // Case 1: failed recall
        if ($quality < 3) {
            $review->repetitions = 0;
            $review->interval = 1;
            $review->due_at = $now->copy()->addDay();
            $xp = 2;
        } else {
            // Case 2: Successful recall
            $review->repetitions++;

            if ($review->repetitions == 1) {
                $review->interval = 1;
            } elseif ($review->repetitions == 2) {
                $review->interval = 6;
            } else {
                $review->interval = round($review->interval * $review->ease_factor);
            }

            $review->due_at = $now->copy()->addDays($review->interval);

            switch ($quality) {
                case 3: $xp = 5;
                    break;
                case 4: $xp = 7;
                    break;
                case 5: $xp = 10;
                    break;
                default: $xp = 5;
            }
        }

        $ef = $review->ease_factor;
        $ef = $ef + (0.1 - (5 - $quality) * (0.08 + (5 - $quality) * 0.02));
        if ($ef < 1.3) {
            $ef = 1.3;
        }
        $review->ease_factor = $ef;

        $review->quality = $quality;
        $review->review_date = $now;
        $review->save();

        XpEvent::create([
            'user_id' => $userId,
            'type' => 'review_card',
            'amount' => $xp,
            'meta_json' => json_encode([
                'flashcard_id' => $review->flashcard_id,
                'quality' => $quality,
            ]),
        ]);

        return [
            'review' => $review,
            'xp' => $xp,
        ];
    }
}
