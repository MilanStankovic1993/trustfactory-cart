<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $items = CartItem::query()
            ->where('user_id', $request->user()->id)
            ->with(['product:id,name,price_cents,stock_quantity'])
            ->orderByDesc('id')
            ->get();

        $totalCents = $items->sum(fn ($i) => $i->quantity * $i->product->price_cents);

        return Inertia::render('Cart/Index', [
            'items' => $items->map(fn ($i) => [
                'id' => $i->id,
                'quantity' => $i->quantity,
                'product' => [
                    'id' => $i->product->id,
                    'name' => $i->product->name,
                    'price_cents' => $i->product->price_cents,
                    'stock_quantity' => $i->product->stock_quantity,
                ],
            ]),
            'total_cents' => $totalCents,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => ['required', 'integer', Rule::exists('products', 'id')],
            'quantity' => ['nullable', 'integer', 'min:1'],
        ]);

        $qty = (int) ($data['quantity'] ?? 1);

        $product = Product::query()->findOrFail($data['product_id']);

        $existing = CartItem::query()
            ->where('user_id', $request->user()->id)
            ->where('product_id', $product->id)
            ->first();

        $newQty = ($existing?->quantity ?? 0) + $qty;

        // ne dozvoli da quantity pređe stock
        $newQty = min($newQty, (int) $product->stock_quantity);

        CartItem::updateOrCreate(
            ['user_id' => $request->user()->id, 'product_id' => $product->id],
            ['quantity' => max(1, $newQty)]
        );

        return back()->with('success', 'Added to cart.');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        abort_unless($cartItem->user_id === $request->user()->id, 403);

        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $stock = (int) $cartItem->product()->value('stock_quantity');

        $cartItem->update([
            'quantity' => min((int) $data['quantity'], $stock),
        ]);

        return back()->with('success', 'Cart updated.');
    }

    public function destroy(Request $request, CartItem $cartItem)
    {
        abort_unless($cartItem->user_id === $request->user()->id, 403);

        $cartItem->delete();

        return back()->with('success', 'Removed from cart.');
    }
}
