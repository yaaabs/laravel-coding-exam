<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // First run the role seeder
        $this->call(RoleSeeder::class);

        // Get admin role
        $adminRole = Role::where('name', 'Admin')->first();

        // Create admin user
        User::create([
            'full_name' => 'Test Admin',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id
        ]);
    }
}
