<?php

namespace App\Models;

use App\Enums\DonationMethod;
use App\Enums\DonationStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'method' => DonationMethod::class,
            'status' => DonationStatus::class,
            'wants_receipt' => 'boolean',
            'received_at' => 'datetime',
        ];
    }

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(DonationCampaign::class, 'campaign_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'received_by');
    }
}
