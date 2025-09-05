<?php

namespace App\Filament\Resources\FlashcardTags;

use App\Filament\Resources\FlashcardTags\Pages\CreateFlashcardTag;
use App\Filament\Resources\FlashcardTags\Pages\EditFlashcardTag;
use App\Filament\Resources\FlashcardTags\Pages\ListFlashcardTags;
use App\Filament\Resources\FlashcardTags\Pages\ViewFlashcardTag;
use App\Filament\Resources\FlashcardTags\Schemas\FlashcardTagForm;
use App\Filament\Resources\FlashcardTags\Schemas\FlashcardTagInfolist;
use App\Filament\Resources\FlashcardTags\Tables\FlashcardTagsTable;
use App\Models\FlashcardTag;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class FlashcardTagResource extends Resource
{
    protected static ?string $model = FlashcardTag::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Flashcard Tag';

    public static function form(Schema $schema): Schema
    {
        return FlashcardTagForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return FlashcardTagInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FlashcardTagsTable::configure($table);
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
            'index' => ListFlashcardTags::route('/'),
            'create' => CreateFlashcardTag::route('/create'),
            'view' => ViewFlashcardTag::route('/{record}'),
            'edit' => EditFlashcardTag::route('/{record}/edit'),
        ];
    }
}
