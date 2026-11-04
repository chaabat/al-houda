<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('donation_campaigns', function (Blueprint $t) {
            $t->id();
            $t->string('slug')->unique();
            $t->json('title');
            $t->json('description')->nullable();
            $t->string('cover_image')->nullable();
            $t->unsignedInteger('goal_cents')->nullable();
            $t->timestamp('starts_at')->nullable();
            $t->timestamp('ends_at')->nullable();
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('donations', function (Blueprint $t) {
            $t->id();
            $t->string('reference')->unique();
            $t->foreignId('campaign_id')->nullable()->constrained('donation_campaigns')->nullOnDelete();
            $t->string('method', 20);
            $t->unsignedInteger('amount_cents');
            $t->char('currency', 3)->default('EUR');
            $t->string('donor_name')->nullable();
            $t->string('donor_email')->nullable();
            $t->string('locale', 5)->default('fr');
            $t->boolean('wants_receipt')->default(false);
            $t->string('status', 20)->default('pending')->index();
            $t->string('provider_ref')->nullable()->index();
            $t->timestamp('received_at')->nullable();
            $t->foreignId('received_by')->nullable()->constrained('users')->nullOnDelete();
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
        Schema::dropIfExists('donation_campaigns');
    }
};
