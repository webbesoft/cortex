<?php

namespace App\Filament\Resources\FlashCards\Pages;

use App\Filament\Resources\FlashCards\FlashCardResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewFlashCard extends ViewRecord
{
    protected static string $resource = FlashCardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
