<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::create([
            'name' => 'Admin',
            'description' => 'Administrator role'
        ]);

        Role::create([
            'name' => 'User',
            'description' => 'Regular user role'
        ]);
    }
}
