<?php

namespace App\Exceptions;

use Illuminate\Http\JsonResponse;
use RuntimeException;

class RegistrationClosedException extends RuntimeException
{
    public function render(): JsonResponse
    {
        return response()->json(['code' => 'registrations_closed'], 403);
    }
}
