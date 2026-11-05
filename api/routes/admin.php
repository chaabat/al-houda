<?php

use App\Http\Controllers\Api\V1\Admin\ActivityController;
use App\Http\Controllers\Api\V1\Admin\AuthController;
use App\Http\Controllers\Api\V1\Admin\CategoryController;
use App\Http\Controllers\Api\V1\Admin\ContactMessageController;
use App\Http\Controllers\Api\V1\Admin\CourseController;
use App\Http\Controllers\Api\V1\Admin\DonationCampaignController;
use App\Http\Controllers\Api\V1\Admin\DonationController;
use App\Http\Controllers\Api\V1\Admin\EventController;
use App\Http\Controllers\Api\V1\Admin\GalleryController;
use App\Http\Controllers\Api\V1\Admin\PageController;
use App\Http\Controllers\Api\V1\Admin\PostController;
use App\Http\Controllers\Api\V1\Admin\RegistrationController;
use App\Http\Controllers\Api\V1\Admin\RegistrationPeriodController;
use App\Http\Controllers\Api\V1\Admin\SettingController;
use App\Http\Controllers\Api\V1\Admin\StatsController;
use App\Http\Controllers\Api\V1\Admin\TeamController;
use App\Http\Controllers\Api\V1\Admin\UploadController;
use App\Http\Controllers\Api\V1\Admin\UserController;
use App\Http\Middleware\EnsureAdmin;
use App\Http\Middleware\EnsureSuperAdmin;
use Illuminate\Support\Facades\Route;

Route::name('admin.')->group(function () {
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

        // Content
        Route::apiResource('courses', CourseController::class);
        Route::apiResource('categories', CategoryController::class);
        Route::apiResource('posts', PostController::class);
        Route::apiResource('events', EventController::class);
        Route::apiResource('pages', PageController::class);
        Route::apiResource('gallery', GalleryController::class);
        Route::apiResource('team', TeamController::class);
        Route::apiResource('campaigns', DonationCampaignController::class);

        // Settings, uploads, activity
        Route::get('settings', [SettingController::class, 'index']);
        Route::put('settings/{name}', [SettingController::class, 'update']);
        Route::post('uploads', [UploadController::class, 'store']);
        Route::get('activity', ActivityController::class);

        // Admin users: super admin only
        Route::middleware(EnsureSuperAdmin::class)->group(function () {
            Route::apiResource('users', UserController::class);
        });
    });
});
