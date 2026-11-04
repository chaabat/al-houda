<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreRegistrationRequest;
use App\Http\Resources\Api\V1\RegistrationReceiptResource;
use App\Http\Resources\Api\V1\RegistrationStatusResource;
use App\Models\RegistrationPeriod;
use App\Services\Interfaces\RegistrationServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function __construct(private RegistrationServiceInterface $registrations)
    {
    }

    public function status(Request $request): RegistrationStatusResource
    {
        $locale = in_array($request->query('locale'), ['fr', 'ar', 'en', 'de'], true) ? $request->query('locale') : 'fr';
        $period = $this->registrations->currentPeriod();

        if ($period) {
            return new RegistrationStatusResource([
                'open' => true,
                'school_year' => $period->school_year,
                'closes_at' => $period->closes_at,
            ]);
        }

        return new RegistrationStatusResource([
            'open' => false,
            'message' => RegistrationPeriod::latest('id')->first()?->getTranslation('closed_message', $locale, true),
        ]);
    }

    public function store(StoreRegistrationRequest $request): JsonResponse
    {
        $registration = $this->registrations->submit($request->validated());

        return (new RegistrationReceiptResource($registration))->response()->setStatusCode(201);
    }
}
