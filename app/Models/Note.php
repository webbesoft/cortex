<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    /** @use HasFactory<\Database\Factories\NoteFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'body_md'
    ];

    public function casts(): array
    {
        return [
            "created_at" => "date:Y-m-d h:i A",
            "updated_at" => "date:Y-m-d h:i A"
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
