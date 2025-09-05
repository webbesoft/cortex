<?php

namespace App\Filament\Resources\FlashCards\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class FlashCardForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                TextInput::make('question')
                    ->required(),
                TextInput::make('answer')
                    ->required(),
                Select::make('note_id')
                    ->relationship('note', 'title'),
            ]);
    }
}
