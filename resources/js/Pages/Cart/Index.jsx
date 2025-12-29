import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Cart({ items, total_cents }) {
    const { flash } = usePage().props;

    const updateQty = (id, quantity) => {
        if (!Number.isFinite(quantity) || quantity < 1) return;
        router.patch(route('cart.items.update', id), { quantity }, { preserveScroll: true });
    };

    const removeItem = (id) => {
        router.delete(route('cart.items.destroy', id), { preserveScroll: true });
    };

    const checkout = () => {
        router.post(route('checkout.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Cart" />

            <div className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

                {flash?.success && (
                    <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
                        {flash.success}
                    </div>
                )}

                {items.length === 0 ? (
                    <div className="bg-white border rounded-xl p-6 text-gray-600">
                        Your cart is empty.
                        <div className="mt-3">
                            <Link
                                href={route('products.index')}
                                className="text-sm text-black underline"
                            >
                                Back to products
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map((i) => (
                            <div
                                key={i.id}
                                className="bg-white border rounded-xl p-5 flex items-center justify-between gap-4"
                            >
                                <div>
                                    <h3 className="font-semibold">{i.product.name}</h3>
                                    <p className="text-sm text-gray-600">
                                        €{(i.product.price_cents / 100).toFixed(2)} · Stock{' '}
                                        {i.product.stock_quantity}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        min="1"
                                        max={i.product.stock_quantity}
                                        value={i.quantity}
                                        onChange={(e) =>
                                            updateQty(i.id, Number(e.target.value))
                                        }
                                        className="w-20 rounded-lg border px-3 py-2 text-sm"
                                    />

                                    <button
                                        onClick={() => removeItem(i.id)}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="bg-white border rounded-xl p-5 flex items-center justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="text-lg font-bold">
                                €{(total_cents / 100).toFixed(2)}
                            </span>
                        </div>

                        <button
                            onClick={checkout}
                            className="w-full rounded-xl bg-black px-5 py-3 text-white font-medium hover:bg-gray-800"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
