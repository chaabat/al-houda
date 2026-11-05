<?php

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\RegistrationPeriod */
class RegistrationPeriodAdminResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'school_year' => $this->school_year,
            'opens_at' => $this->opens_at,
            'closes_at' => $this->closes_at,
            'is_open' => $this->is_open,
            'is_currently_open' => $this->isCurrentlyOpen(),
            'closed_message' => $this->getTranslations('closed_message'),
            'registrations_count' => $this->whenCounted('registrations'),
        ];
    }
}
