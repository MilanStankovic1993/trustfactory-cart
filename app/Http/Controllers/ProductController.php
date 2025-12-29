<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::query()
                ->orderBy('name')
                ->get(['id', 'name', 'price_cents', 'stock_quantity']),
        ]);
    }
}
