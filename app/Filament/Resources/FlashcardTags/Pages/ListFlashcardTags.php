<?php

namespace App\Filament\Resources\FlashcardTags\Pages;

use App\Filament\Resources\FlashcardTags\FlashcardTagResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFlashcardTags extends ListRecords
{
    protected static string $resource = FlashcardTagResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
