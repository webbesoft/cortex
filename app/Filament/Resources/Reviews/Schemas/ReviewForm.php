<?php

namespace App\Filament\Resources\Reviews\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('flashcard_id')
                    ->relationship('flashcard', 'id')
                    ->required(),
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                DatePicker::make('review_date')
                    ->required(),
                TextInput::make('quality')
                    ->required()
                    ->numeric()
                    ->default(5),
                TextInput::make('ease_factor')
                    ->required()
                    ->numeric()
                    ->default(2.5),
                TextInput::make('interval')
                    ->required()
                    ->numeric()
                    ->default(1),
                DatePicker::make('due_at')
                    ->required(),
            ]);
    }
}
