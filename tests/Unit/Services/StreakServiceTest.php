<?php

use App\Models\User;
use App\Services\StreakService;
use Carbon\Carbon;

it('should increase streak if last viewed was yesterday', function () {
    $nowTime = Carbon::now();
    $user = User::factory()->create([
        'last_reviewed_at' => $nowTime->copy()->subDay(), // Use copy()
        'streak' => 3,
    ]);

    StreakService::updateUserStreak($user);

    $user->refresh();

    expect($user->streak)->toBe(4);
    expect($user->last_reviewed_at->toDateString())->toBe($nowTime->toDateString()); // Compare date strings
});

it('should not increase streak if last viewed was today', function () {
    $nowTime = Carbon::now();
    $user = User::factory()->create([
        'last_reviewed_at' => $nowTime->copy(),
        'streak' => 3,
    ]);

    StreakService::updateUserStreak($user);

    $user->refresh();

    expect($user->streak)->toBe(3);
    expect($user->last_reviewed_at->toDateString())->toBe($nowTime->toDateString());

});

test('should reset streak if last viewed was before yesterday', function () {
    $nowTime = Carbon::now();
    $user = User::factory()->create([
        'last_reviewed_at' => $nowTime->copy()->subDays(3),
        'streak' => 3,
    ]);

    StreakService::updateUserStreak($user);

    $user->refresh();

    expect($user->streak)->toBe(1);
    expect($user->last_reviewed_at->toDateString())->toBe($nowTime->toDateString());
});
