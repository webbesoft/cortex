<?php

namespace App\Filament\Resources\FlashcardTags\Pages;

use App\Filament\Resources\FlashcardTags\FlashcardTagResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewFlashcardTag extends ViewRecord
{
    protected static string $resource = FlashcardTagResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
