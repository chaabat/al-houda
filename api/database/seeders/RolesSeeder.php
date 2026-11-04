<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['super_admin', 'admin'] as $role) {
            Role::firstOrCreate(['name' => $role, 'guard_name' => 'web']);
        }

        $user = User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@alhouda.local')],
            [
                'name' => 'Admin',
                'password' => env('ADMIN_PASSWORD', 'ChangeMe123!'),
            ]
        );

        $user->syncRoles(['super_admin']);
    }
}
