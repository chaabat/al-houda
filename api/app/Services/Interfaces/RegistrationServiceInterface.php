<?php

namespace App\Services\Interfaces;

use App\Models\Registration;
use App\Models\RegistrationPeriod;
use App\Models\User;

interface RegistrationServiceInterface
{
    public function currentPeriod(): ?RegistrationPeriod;

    public function submit(array $data): Registration;

    public function accept(Registration $registration, User $by): Registration;

    public function refuse(Registration $registration, User $by, ?string $reason = null): Registration;
}
