<?php

namespace App\Filament\Resources\Flashcards;

use App\Filament\Resources\Flashcards\Pages\CreateFlashcard;
use App\Filament\Resources\Flashcards\Pages\EditFlashcard;
use App\Filament\Resources\Flashcards\Pages\ListFlashcards;
use App\Filament\Resources\Flashcards\Pages\ViewFlashcard;
use App\Filament\Resources\Flashcards\Schemas\FlashcardForm;
use App\Filament\Resources\Flashcards\Schemas\FlashcardInfolist;
use App\Filament\Resources\Flashcards\Tables\FlashcardsTable;
use App\Models\FlashCard;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FlashcardResource extends Resource
{
    protected static ?string $model = FlashCard::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Flashcard';

    public static function form(Schema $schema): Schema
    {
        return FlashcardForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return FlashcardInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FlashcardsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListFlashcards::route('/'),
            'create' => CreateFlashcard::route('/create'),
            'view' => ViewFlashcard::route('/{record}'),
            'edit' => EditFlashcard::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
