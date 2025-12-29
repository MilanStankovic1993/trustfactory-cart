<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        // Dummy admin (mail ide na ADMIN_EMAIL iz .env)
        User::firstOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@example.com')],
            [
                'name' => 'Dummy Admin',
                'password' => Hash::make('password'),
            ]
        );

        // Demo user za login
        User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Demo User',
                'password' => Hash::make('password'),
            ]
        );

        // Proizvodi (ne koristimo truncate ako ima foreign key constraints u budućnosti)
        Product::query()->updateOrCreate(
            ['name' => 'Helmet'],
            ['price_cents' => 8999, 'stock_quantity' => 8]
        );

        Product::query()->updateOrCreate(
            ['name' => 'Gloves'],
            ['price_cents' => 2999, 'stock_quantity' => 3] // low stock odmah
        );

        Product::query()->updateOrCreate(
            ['name' => 'Suit'],
            ['price_cents' => 15999, 'stock_quantity' => 12]
        );
    }
}
