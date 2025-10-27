import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header({ search, onSearchChange }) {
    const { totalItems } = useCart();
    const navigate = useNavigate();

    return (
        <header className="bg-white shadow-md sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">

                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    className="text-2xl sm:text-3xl font-extrabold cursor-pointer tracking-wide text-blue-600"
                >
                    Trendify
                </div>

                {/* Search always visible */}
                <div className="flex-1 min-w-[200px] flex justify-center order-3 sm:order-1 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full max-w-md border border-gray-300 rounded-full px-5 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Navigation always visible */}
                <nav className="flex items-center gap-6 text-sm font-medium order-2 sm:order-2">
                    <NavLink
                        to="/checkout"
                        className={({ isActive }) =>
                            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                        }
                    >
                        Checkout
                    </NavLink>

                    <NavLink to="/cart" className="relative">
                        <span className="text-gray-700">Cart</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                                {totalItems}
                            </span>
                        )}
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
