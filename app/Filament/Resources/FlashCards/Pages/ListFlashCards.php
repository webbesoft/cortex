<?php

namespace App\Filament\Resources\FlashCards\Pages;

use App\Filament\Resources\FlashCards\FlashCardResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFlashCards extends ListRecords
{
    protected static string $resource = FlashCardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
