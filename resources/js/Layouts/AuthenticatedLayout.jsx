import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top bar */}
            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Brand */}
                    <Link href={route('products.index')} className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-black text-white flex items-center justify-center font-bold">
                            TF
                        </div>
                        <div className="font-semibold text-lg text-gray-900">
                            Trustfactory Cart
                        </div>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-6">
                        <Link
                            href={route('products.index')}
                            className="text-sm text-gray-700 hover:text-black"
                        >
                            Products
                        </Link>

                        {/* Cart icon */}
                        <Link
                            href={route('cart.index')}
                            className="relative text-gray-700 hover:text-black"
                            title="Cart"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .96.343 1.09.835l.383 1.437M7.5 14.25h10.505c.867 0 1.625-.6 1.82-1.447l1.2-5.25H6.164M7.5 14.25L5.106 5.272M7.5 14.25l-1.5 6m13.5-6l1.5 6m-10.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                            </svg>
                        </Link>

                        {/* User dropdown */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="inline-flex items-center text-sm text-gray-700 hover:text-black"
                                >
                                    {user.name}
                                    <svg
                                        className="ml-1 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main>{children}</main>
        </div>
    );
}
