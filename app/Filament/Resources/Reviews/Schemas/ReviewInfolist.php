<?php

namespace App\Filament\Resources\Reviews\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ReviewInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('flashcard.id'),
                TextEntry::make('user.name'),
                TextEntry::make('review_date')
                    ->date(),
                TextEntry::make('quality')
                    ->numeric(),
                TextEntry::make('ease_factor')
                    ->numeric(),
                TextEntry::make('interval')
                    ->numeric(),
                TextEntry::make('due_at')
                    ->date(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
