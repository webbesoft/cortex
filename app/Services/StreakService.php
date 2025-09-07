<?php

namespace App\Services;

use App\Models\User;
use Carbon\Carbon;

class StreakService
{
    public static function updateUserStreak(User $user)
    {
        if (Carbon::now()->subDay()->isSameDay($user->last_reviewed_at)) {
            $user->update([
                'last_reviewed_at' => Carbon::now(),
                'streak' => $user->streak + 1,
            ]);
        } elseif (Carbon::now()->isSameDay($user->last_reviewed_at)) {
            $user->update([
                'last_reviewed_at' => Carbon::now(),
            ]);
        } else {
            $user->update([
                'last_reviewed_at' => Carbon::now(),
                'streak' => 1,
            ]);
        }
    }
}
