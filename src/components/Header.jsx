// Header.jsx (search already working)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { NavLink } from "react-router-dom";

export default function Header() {
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim() === "") return;
        navigate(`/?search=${encodeURIComponent(search.trim())}`);
        setSearch("");
        setMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between gap-6">
                <div
                    onClick={() => navigate("/")}
                    className="text-3xl font-extrabold cursor-pointer whitespace-nowrap tracking-wide text-blue-600"
                >
                    Trendify
                </div>

                <form onSubmit={handleSubmit} className="hidden sm:flex flex-1 justify-center">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md border border-gray-300 rounded-full px-5 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </form>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <NavLink to="/checkout" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
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

                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 focus:outline-none">
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {menuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        )}
                    </svg>
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white border-t">
                    <form onSubmit={handleSubmit} className="p-4 flex justify-center">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </form>

                    <nav className="flex flex-col p-4 gap-4 text-sm font-medium">
                        <NavLink onClick={() => setMenuOpen(false)} to="/checkout" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
                            Checkout
                        </NavLink>

                        <NavLink onClick={() => setMenuOpen(false)} to="/cart" className="relative">
                            <span className="text-gray-700">Cart</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                                    {totalItems}
                                </span>
                            )}
                        </NavLink>
                    </nav>
                </div>
            )}
        </header>
    );
}
