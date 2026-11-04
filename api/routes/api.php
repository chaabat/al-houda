<?php

use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\CourseController;
use App\Http\Controllers\Api\V1\DonationCampaignController;
use App\Http\Controllers\Api\V1\DonationController;
use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\GalleryController;
use App\Http\Controllers\Api\V1\PageController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\RegistrationController;
use App\Http\Controllers\Api\V1\SettingController;
use App\Http\Controllers\Api\V1\TeamController;
use App\Http\Middleware\SetLocale;
use Illuminate\Support\Facades\Route;

Route::middleware(SetLocale::class)->group(function () {
    // Content
    Route::get('settings', [SettingController::class, 'index']);
    Route::get('pages/{slug}', [PageController::class, 'show']);
    Route::get('team', [TeamController::class, 'index']);
    Route::get('gallery', [GalleryController::class, 'index']);
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('posts', [PostController::class, 'index']);
    Route::get('posts/{slug}', [PostController::class, 'show'])->name('posts.show');
    Route::get('events', [EventController::class, 'index']);
    Route::get('events/{slug}', [EventController::class, 'show'])->name('events.show');
    Route::get('courses', [CourseController::class, 'index']);

    // Registrations
    Route::get('registration-status', [RegistrationController::class, 'status']);
    Route::post('registrations', [RegistrationController::class, 'store'])->middleware('throttle:5,1');

    // Contact
    Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:5,1');

    // Donations
    Route::get('donation-campaigns', [DonationCampaignController::class, 'index']);
    Route::get('donations/rib', [DonationController::class, 'rib']);
    Route::post('donations/rib', [DonationController::class, 'storeRib'])->middleware('throttle:10,1');
});

Route::prefix('admin')->group(base_path('routes/admin.php'));
