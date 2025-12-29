import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ products }) {
  const { flash } = usePage().props;

  const addToCart = (productId) => {
    router.post(route('cart.items.store'), { product_id: productId, quantity: 1 }, { preserveScroll: true });
  };

  return (
    <AuthenticatedLayout header={<h2 className="font-semibold text-xl">Products</h2>}>
      <Head title="Products" />

      <div className="py-6 max-w-6xl mx-auto px-4">
        {flash?.success && (
          <div className="mb-4 rounded bg-green-50 text-green-700 px-4 py-2">{flash.success}</div>
        )}

        <div className="flex justify-end mb-4">
          <Link className="underline" href={route('cart.index')}>Go to Cart</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p.id} className="border rounded-lg p-4 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-600">
                    €{(p.price_cents / 100).toFixed(2)} · Stock: {p.stock_quantity}
                  </div>
                </div>
                <button
                  className="px-3 py-2 rounded bg-black text-white disabled:opacity-50"
                  onClick={() => addToCart(p.id)}
                  disabled={p.stock_quantity <= 0}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
