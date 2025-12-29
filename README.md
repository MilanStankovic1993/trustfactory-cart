# Trustfactory Cart (Laravel + Inertia React)

Simple e-commerce shopping cart demo:
- Browse products
- Add/update/remove cart items (**stored in DB per authenticated user**, not session/local storage)
- Checkout creates `orders` + `order_items`, decrements product stock and clears the cart
- **Low stock notification** triggers a queued job and emails a dummy admin user
- **Daily sales report** command + scheduler sends a report of products sold that day to the dummy admin

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

Create SQLite file (Windows):
php -r "file_exists('database/database.sqlite') || fopen('database/database.sqlite','w');"

Run migrations + seed demo data:
php artisan migrate
php artisan db:seed

Run app:
php artisan serve
npm install
npm run dev

Demo credentials:
Email: user@example.com
Password: password

Cart Badge (optional UX)
The cart icon shows a badge with the total quantity of items in the cart.
This value is shared via Inertia (cart_count) and is calculated from DB per authenticated user.
Low Stock Notification (Queue)

Config in .env:
QUEUE_CONNECTION=database
MAIL_MAILER=log
ADMIN_EMAIL=admin@example.com
LOW_STOCK_THRESHOLD=5

Run worker:
php artisan queue:work

Emails are logged in:
storage/logs/laravel.log