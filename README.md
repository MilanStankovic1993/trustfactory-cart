# Trustfactory – Simple E-commerce Shopping Cart (Laravel + Inertia React)

Simple e-commerce shopping cart demo:
- Browse products
- Add/update/remove cart items (**stored in DB per authenticated user**, not session/local storage)
- Checkout creates `orders` + `order_items` and decrements product stock
- **Low stock notification** triggers a queued job and emails admin
- **Daily sales report** runs via scheduler every evening and emails admin

## Tech Stack
- Laravel 12
- Breeze (Inertia + React)
- Tailwind CSS
- SQLite (local)
- Queue: database
- Mail: log (emails are written to `storage/logs/laravel.log`)

## Local Setup
```bash
composer install
cp .env.example .env
php artisan key:generate
