import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function Index({ products }) {
    const { flash } = usePage().props;

    const addToCart = (productId) => {
        router.post(
            route('cart.items.store'),
            { product_id: productId, quantity: 1 },
            { preserveScroll: true }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Products" />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-semibold mb-6">Products</h1>

                {flash?.success && (
                    <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white border rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">{p.name}</h3>

                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                    <span>€{(p.price_cents / 100).toFixed(2)}</span>
                                    <span className="text-gray-300">•</span>
                                    <span>
                                        Stock:{' '}
                                        <span
                                            className={
                                                p.stock_quantity <= 5
                                                    ? 'text-red-600 font-medium'
                                                    : ''
                                            }
                                        >
                                            {p.stock_quantity}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => addToCart(p.id)}
                                disabled={p.stock_quantity <= 0}
                                className="mt-4 inline-flex justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-40"
                            >
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
