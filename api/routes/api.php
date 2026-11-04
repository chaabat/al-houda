<?php

use App\Http\Controllers\Api\V1\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::get('registration-status', [RegistrationController::class, 'status']);
Route::post('registrations', [RegistrationController::class, 'store'])->middleware('throttle:5,1');
