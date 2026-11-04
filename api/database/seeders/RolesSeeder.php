<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {
        foreach (['super_admin', 'admin'] as $role) {
            Role::firstOrCreate(['name' => $role, 'guard_name' => 'web']);
        }

        $user = User::firstOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@alhouda.local')],
            [
                'name' => 'Admin',
                'password' => env('ADMIN_PASSWORD', 'alhouda'),
            ]
        );
        $user->assignRole('super_admin');
    }
}
