<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreContactRequest;
use App\Services\Interfaces\ContactServiceInterface;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function __construct(private ContactServiceInterface $contacts)
    {
    }

    public function store(StoreContactRequest $request): JsonResponse
    {
        $this->contacts->store($request->validated());

        return response()->json(['data' => ['received' => true]], 201);
    }
}
