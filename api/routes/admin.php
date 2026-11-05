<?php

use App\Http\Controllers\Api\V1\Admin\AuthController;
use App\Http\Controllers\Api\V1\Admin\ContactMessageController;
use App\Http\Controllers\Api\V1\Admin\DonationController;
use App\Http\Controllers\Api\V1\Admin\RegistrationController;
use App\Http\Controllers\Api\V1\Admin\RegistrationPeriodController;
use App\Http\Controllers\Api\V1\Admin\StatsController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware(['auth:sanctum', EnsureAdmin::class])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    Route::get('stats', StatsController::class);

    // Registrations
    Route::get('registrations/export', [RegistrationController::class, 'export']);
    Route::get('registrations', [RegistrationController::class, 'index']);
    Route::get('registrations/{registration}', [RegistrationController::class, 'show']);
    Route::patch('registrations/{registration}', [RegistrationController::class, 'update']);
    Route::post('registrations/{registration}/accept', [RegistrationController::class, 'accept']);
    Route::post('registrations/{registration}/refuse', [RegistrationController::class, 'refuse']);

    // Registration periods
    Route::apiResource('periods', RegistrationPeriodController::class);
    Route::post('periods/{period}/open', [RegistrationPeriodController::class, 'open']);
    Route::post('periods/{period}/close', [RegistrationPeriodController::class, 'close']);

    // Donations
    Route::get('donations/export', [DonationController::class, 'export']);
    Route::get('donations', [DonationController::class, 'index']);
    Route::get('donations/{donation}', [DonationController::class, 'show']);
    Route::post('donations/{donation}/mark-received', [DonationController::class, 'markReceived']);

    // Contact messages
    Route::apiResource('messages', ContactMessageController::class)->only(['index', 'show', 'destroy']);

    // Next batch: courses, posts, categories, events, pages, gallery, team, campaigns, settings, uploads.
});
