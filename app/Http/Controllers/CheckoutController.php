<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Jobs\SendLowStockNotification;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $userId = $request->user()->id;

        DB::transaction(function () use ($userId) {
            $items = CartItem::query()
                ->where('user_id', $userId)
                ->with('product')
                ->lockForUpdate()
                ->get();

            if ($items->isEmpty()) {
                abort(422, 'Cart is empty.');
            }

            foreach ($items as $item) {
                if ($item->quantity > $item->product->stock_quantity) {
                    abort(422, "Not enough stock for {$item->product->name}.");
                }
            }

            $totalCents = $items->sum(fn ($i) => $i->quantity * $i->product->price_cents);

            $order = Order::create([
                'user_id' => $userId,
                'total_cents' => $totalCents,
            ]);

            foreach ($items as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price_cents' => $item->product->price_cents,
                ]);

                Product::query()
                    ->whereKey($item->product_id)
                    ->decrement('stock_quantity', $item->quantity);

                $freshStock = Product::query()
                    ->whereKey($item->product_id)
                    ->value('stock_quantity');

                if ($freshStock <= (int) env('LOW_STOCK_THRESHOLD', 5)) {
                    SendLowStockNotification::dispatch($item->product_id);
                }
            }

            CartItem::query()->where('user_id', $userId)->delete();
        });

        return redirect()->route('products.index')->with('success', 'Checkout complete!');
    }
}
