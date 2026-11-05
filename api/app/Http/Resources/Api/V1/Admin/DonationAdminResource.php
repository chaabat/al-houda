<?php

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Donation */
class DonationAdminResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'method' => $this->method->value,
            'status' => $this->status->value,
            'amount_cents' => $this->amount_cents,
            'currency' => $this->currency,
            'donor_name' => $this->donor_name,
            'donor_email' => $this->donor_email,
            'locale' => $this->locale,
            'wants_receipt' => $this->wants_receipt,
            'provider_ref' => $this->provider_ref,
            'received_at' => $this->received_at,
            'created_at' => $this->created_at,
            'campaign' => $this->whenLoaded('campaign', fn () => $this->campaign
                ? ['id' => $this->campaign->id, 'title' => $this->campaign->title]
                : null),
            'received_by' => $this->whenLoaded('receiver', fn () => $this->receiver?->name),
        ];
    }
}
