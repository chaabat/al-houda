<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreRibDonationRequest;
use App\Services\Interfaces\DonationServiceInterface;
use Illuminate\Http\JsonResponse;

class DonationController extends Controller
{
    public function __construct(private DonationServiceInterface $donations)
    {
    }

    public function rib(): JsonResponse
    {
        return response()->json(['data' => $this->donations->ribDetails()]);
    }

    public function storeRib(StoreRibDonationRequest $request): JsonResponse
    {
        $donation = $this->donations->createRib($request->validated());

        return response()->json(['data' => [
            'reference' => $donation->reference,
            'amount_cents' => $donation->amount_cents,
            'currency' => $donation->currency,
            'rib' => $this->donations->ribDetails(),
        ]], 201);
    }
}
