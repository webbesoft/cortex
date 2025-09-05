<?php

namespace App\Filament\Resources\FlashcardTags\Schemas;

use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class FlashcardTagForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('flash_card_id')
                    ->relationship('flashCard', 'id')
                    ->required(),
                Select::make('tag_id')
                    ->relationship('tag', 'title')
                    ->required(),
            ]);
    }
}
