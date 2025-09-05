<?php

namespace App\Filament\Resources\FlashCards;

use App\Filament\Resources\FlashCards\Pages\CreateFlashCard;
use App\Filament\Resources\FlashCards\Pages\EditFlashCard;
use App\Filament\Resources\FlashCards\Pages\ListFlashCards;
use App\Filament\Resources\FlashCards\Pages\ViewFlashCard;
use App\Filament\Resources\FlashCards\Schemas\FlashCardForm;
use App\Filament\Resources\FlashCards\Schemas\FlashCardInfolist;
use App\Filament\Resources\FlashCards\Tables\FlashCardsTable;
use App\Models\FlashCard;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FlashCardResource extends Resource
{
    protected static ?string $model = FlashCard::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Flashcard';

    public static function form(Schema $schema): Schema
    {
        return FlashCardForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return FlashCardInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FlashCardsTable::configure($table);
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
            'index' => ListFlashCards::route('/'),
            'create' => CreateFlashCard::route('/create'),
            'view' => ViewFlashCard::route('/{record}'),
            'edit' => EditFlashCard::route('/{record}/edit'),
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
