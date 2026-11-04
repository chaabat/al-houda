<?php

namespace App\Services\Interfaces;

use App\Models\Donation;
use App\Models\User;

interface DonationServiceInterface
{
    public function ribDetails(): ?array;

    public function createRib(array $data): Donation;

    public function markReceived(Donation $donation, User $by): Donation;
}
