<?php

namespace App\Filament\Resources\Registrations\Pages;

use App\Filament\Resources\Registrations\RegistrationResource;
use Filament\Resources\Pages\ViewRecord;

class ViewRegistration extends ViewRecord
{
    protected static string $resource = RegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            RegistrationResource::acceptAction()->successRedirectUrl(fn () => static::getUrl(['record' => $this->record])),
            RegistrationResource::refuseAction()->successRedirectUrl(fn () => static::getUrl(['record' => $this->record])),
        ];
    }
}
