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
    router.post(route('checkout.store'), {}, { preserveScroll: true });
  };

  return (
    <AuthenticatedLayout header={<h2 className="font-semibold text-xl">Your Cart</h2>}>
      <Head title="Cart" />

      <div className="py-6 max-w-4xl mx-auto px-4">
        {flash?.success && (
          <div className="mb-4 rounded bg-green-50 text-green-700 px-4 py-2">{flash.success}</div>
        )}

        <div className="mb-4">
          <Link className="underline" href={route('products.index')}>← Back to Products</Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white border rounded p-6">Cart is empty.</div>
        ) : (
          <div className="space-y-3">
            {items.map(i => (
              <div key={i.id} className="bg-white border rounded p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold">{i.product.name}</div>
                  <div className="text-sm text-gray-600">
                    €{(i.product.price_cents / 100).toFixed(2)} · Stock: {i.product.stock_quantity}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="w-20 border rounded px-2 py-1"
                    min="1"
                    max={i.product.stock_quantity}
                    value={i.quantity}
                    onChange={(e) => updateQty(i.id, Number(e.target.value))}
                  />
                  <button className="px-3 py-2 rounded border" onClick={() => removeItem(i.id)}>Remove</button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between bg-white border rounded p-4">
              <div className="font-semibold">Total</div>
              <div className="font-semibold">€{(total_cents / 100).toFixed(2)}</div>
            </div>

            <button className="w-full px-4 py-3 rounded bg-black text-white" onClick={checkout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
