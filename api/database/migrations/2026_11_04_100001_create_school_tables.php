<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('registration_periods', function (Blueprint $t) {
            $t->id();
            $t->string('school_year');
            $t->timestamp('opens_at')->nullable();
            $t->timestamp('closes_at')->nullable();
            $t->boolean('is_open')->default(false);
            $t->json('closed_message')->nullable();
            $t->timestamps();
        });

        Schema::create('courses', function (Blueprint $t) {
            $t->id();
            $t->string('slug')->unique();
            $t->json('title');
            $t->json('description')->nullable();
            $t->json('schedule')->nullable();
            $t->string('level')->nullable();
            $t->unsignedTinyInteger('age_min')->nullable();
            $t->unsignedTinyInteger('age_max')->nullable();
            $t->string('teacher_name')->nullable();
            $t->unsignedSmallInteger('max_places')->nullable();
            $t->unsignedSmallInteger('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('registrations', function (Blueprint $t) {
            $t->id();
            $t->string('reference')->unique();
            $t->foreignId('period_id')->constrained('registration_periods')->restrictOnDelete();
            $t->string('parent_name');
            $t->string('email')->index();
            $t->string('phone');
            $t->string('address')->nullable();
            $t->string('locale', 5)->default('fr');
            $t->string('status', 20)->default('pending')->index();
            $t->text('refusal_reason')->nullable();
            $t->text('admin_notes')->nullable();
            $t->timestamp('consent_at');
            $t->foreignId('decided_by')->nullable()->constrained('users')->nullOnDelete();
            $t->timestamp('decided_at')->nullable();
            $t->timestamp('notified_at')->nullable();
            $t->timestamps();
        });

        Schema::create('registration_children', function (Blueprint $t) {
            $t->id();
            $t->foreignId('registration_id')->constrained()->cascadeOnDelete();
            $t->string('first_name');
            $t->string('last_name');
            $t->date('birth_date');
            $t->string('gender', 10)->nullable();
            $t->string('level')->nullable();
            $t->foreignId('course_id')->nullable()->constrained()->nullOnDelete();
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registration_children');
        Schema::dropIfExists('registrations');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('registration_periods');
    }
};
