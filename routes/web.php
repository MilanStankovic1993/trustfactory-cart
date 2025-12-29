<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

// Root ide na products (task requirement)
Route::get('/', fn () => redirect()->route('products.index'));

Route::get('/dashboard', fn () => redirect()->route('products.index'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
/*
|--------------------------------------------------------------------------
| Authenticated
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    // Products
    Route::get('/products', [ProductController::class, 'index'])
        ->name('products.index');

    // Cart
    Route::get('/cart', [CartController::class, 'index'])
        ->name('cart.index');

    Route::post('/cart/items', [CartController::class, 'store'])
        ->name('cart.items.store');

    Route::patch('/cart/items/{cartItem}', [CartController::class, 'update'])
        ->name('cart.items.update');

    Route::delete('/cart/items/{cartItem}', [CartController::class, 'destroy'])
        ->name('cart.items.destroy');

    // Checkout
    Route::post('/checkout', [CheckoutController::class, 'store'])
        ->name('checkout.store');

    // Profile (Breeze – zadržavamo)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Auth routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/auth.php';
