<?php

namespace App\Services\Implementations;

use App\Enums\DonationMethod;
use App\Enums\DonationStatus;
use App\Models\Donation;
use App\Models\Setting;
use App\Models\User;
use App\Services\Interfaces\DonationServiceInterface;
use DomainException;
use Illuminate\Support\Str;

class DonationService implements DonationServiceInterface
{
    public function ribDetails(): ?array
    {
        return Setting::find('rib')?->value;
    }

    public function createRib(array $data): Donation
    {
        return Donation::create([
            'reference' => $this->newReference(),
            'campaign_id' => $data['campaign_id'] ?? null,
            'method' => DonationMethod::Rib,
            'amount_cents' => $data['amount_cents'],
            'currency' => 'EUR',
            'donor_name' => $data['donor_name'] ?? null,
            'donor_email' => $data['donor_email'] ?? null,
            'locale' => $data['locale'] ?? 'fr',
            'wants_receipt' => $data['wants_receipt'] ?? false,
            'status' => DonationStatus::Pending,
        ]);
    }

    public function markReceived(Donation $donation, User $by): Donation
    {
        if ($donation->status !== DonationStatus::Pending) {
            throw new DomainException('Only a pending donation can be marked as received.');
        }

        $donation->update([
            'status' => DonationStatus::Received,
            'received_at' => now(),
            'received_by' => $by->id,
        ]);

        return $donation;
    }

    private function newReference(): string
    {
        do {
            $reference = 'DON-'.now()->year.'-'.Str::upper(Str::random(6));
        } while (Donation::where('reference', $reference)->exists());

        return $reference;
    }
}
