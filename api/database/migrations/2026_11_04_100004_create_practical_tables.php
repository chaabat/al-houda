<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $t) {
            $t->string('name')->primary();
            $t->json('value')->nullable();
            $t->timestamps();
        });

        Schema::create('contact_messages', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('email');
            $t->string('subject')->nullable();
            $t->text('message');
            $t->string('locale', 5)->default('fr');
            $t->string('status', 20)->default('new')->index();
            $t->timestamp('read_at')->nullable();
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('settings');
    }
};
