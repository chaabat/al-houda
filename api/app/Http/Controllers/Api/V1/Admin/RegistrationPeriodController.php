<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\StoreRegistrationPeriodRequest;
use App\Http\Resources\Api\V1\Admin\RegistrationPeriodAdminResource;
use App\Models\RegistrationPeriod;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RegistrationPeriodController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return RegistrationPeriodAdminResource::collection(
            RegistrationPeriod::withCount('registrations')->latest('id')->get()
        );
    }

    public function show(RegistrationPeriod $period): RegistrationPeriodAdminResource
    {
        return new RegistrationPeriodAdminResource($period->loadCount('registrations'));
    }

    public function store(StoreRegistrationPeriodRequest $request): JsonResponse
    {
        $period = RegistrationPeriod::create($this->payload($request->validated()));

        return (new RegistrationPeriodAdminResource($period))->response()->setStatusCode(201);
    }

    public function update(StoreRegistrationPeriodRequest $request, RegistrationPeriod $period): RegistrationPeriodAdminResource
    {
        $period->update($this->payload($request->validated()));

        return new RegistrationPeriodAdminResource($period->loadCount('registrations'));
    }

    public function destroy(RegistrationPeriod $period): JsonResponse
    {
        if ($period->registrations()->exists()) {
            return response()->json(['message' => 'This period has registrations.', 'code' => 'has_registrations'], 409);
        }

        $period->delete();

        return response()->json(null, 204);
    }

    public function open(RegistrationPeriod $period): RegistrationPeriodAdminResource
    {
        $period->update(['is_open' => true]);

        return new RegistrationPeriodAdminResource($period->loadCount('registrations'));
    }

    public function close(RegistrationPeriod $period): RegistrationPeriodAdminResource
    {
        $period->update(['is_open' => false]);

        return new RegistrationPeriodAdminResource($period->loadCount('registrations'));
    }

    private function payload(array $data): array
    {
        if (array_key_exists('closed_message', $data)) {
            $data['closed_message'] = array_filter($data['closed_message'] ?? [], fn ($v) => filled($v));
        }

        return $data;
    }
}
