<?php

namespace App\Filament\Resources\FlashcardTags\Pages;

use App\Filament\Resources\FlashcardTags\FlashcardTagResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditFlashcardTag extends EditRecord
{
    protected static string $resource = FlashcardTagResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
