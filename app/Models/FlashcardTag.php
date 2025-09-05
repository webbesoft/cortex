<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FlashcardTag extends Model
{
    /** @use HasFactory<\Database\Factories\FlashcardTagFactory> */
    use HasFactory;

    protected $fillable = [
        'flash_card_id',
        'tag_id'
    ];

    public function flashcard(): BelongsTo
    {
        return $this->belongsTo(FlashCard::class);
    }

    public function tag(): BelongsTo
    {
        return $this->belongsTo(Tag::class);
    }
}
