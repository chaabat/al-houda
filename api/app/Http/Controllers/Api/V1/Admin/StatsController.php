<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\DonationStatus;
use App\Enums\RegistrationStatus;
use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Donation;
use App\Models\Registration;
use App\Services\Interfaces\RegistrationServiceInterface;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    public function __construct(private RegistrationServiceInterface $registrations)
    {
    }

    public function __invoke(): JsonResponse
    {
        return response()->json(['data' => [
            'registrations' => [
                'pending' => Registration::where('status', RegistrationStatus::Pending->value)->count(),
                'accepted' => Registration::where('status', RegistrationStatus::Accepted->value)->count(),
                'refused' => Registration::where('status', RegistrationStatus::Refused->value)->count(),
                'is_open' => $this->registrations->currentPeriod() !== null,
            ],
            'donations' => [
                'pending' => Donation::where('status', DonationStatus::Pending->value)->count(),
                'received_count' => Donation::where('status', DonationStatus::Received->value)->count(),
                'received_total_cents' => (int) Donation::where('status', DonationStatus::Received->value)->sum('amount_cents'),
            ],
            'messages' => [
                'unread' => ContactMessage::where('status', 'new')->count(),
            ],
        ]]);
    }
}
