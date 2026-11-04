<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationStatusResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'open' => $this->resource['open'],
            'school_year' => $this->resource['school_year'] ?? null,
            'closes_at' => $this->resource['closes_at'] ?? null,
            'message' => $this->resource['message'] ?? null,
        ];
    }
}
