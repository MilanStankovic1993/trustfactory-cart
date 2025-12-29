<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price_cents',
        'stock_quantity',
    ];

    protected $casts = [
        'price_cents' => 'int',
        'stock_quantity' => 'int',
    ];
}
