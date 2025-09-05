<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewFactory> */
    use HasFactory;

    protected $fillable = [
        'flashcard_id',
        'user_id',
        'review_date',
        'quality',
        'ease_factor',
        'interval',
        'due_at',
        'repetitions'
    ];

    public function casts(): array
    {
        return [
            "review_date" => "date",
            "due_at" => 'date'
        ];
    }

    public function flashcard(): BelongsTo
    {
        return $this->belongsTo(FlashCard::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
