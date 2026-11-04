<?php

namespace App\Providers;

use App\Services\Implementations\ContactService;
use App\Services\Implementations\DonationService;
use App\Services\Implementations\RegistrationService;
use App\Services\Interfaces\ContactServiceInterface;
use App\Services\Interfaces\DonationServiceInterface;
use App\Services\Interfaces\RegistrationServiceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public array $bindings = [
        RegistrationServiceInterface::class => RegistrationService::class,
        DonationServiceInterface::class => DonationService::class,
        ContactServiceInterface::class => ContactService::class,
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        //
    }
}
