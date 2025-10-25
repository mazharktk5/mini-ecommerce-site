import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

export default function CartSummary() {
    const { totalItems, totalPrice, clearCart } = useCart();

    return (
        <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-[0_10px_25px_rgba(150,150,200,0.25)] sticky top-6 self-start max-h-[400px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
                <span>Items:</span>
                <span>{totalItems}</span>
            </div>
            <div className="flex justify-between mb-4">
                <span>Total:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </div>

            <button
                onClick={() => toast.success("Proceeding to checkout...")}
                className="w-full px-4 py-2 rounded-full font-medium bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:opacity-90 active:scale-95 transition"
            >
                Checkout
            </button>

            <button
                onClick={clearCart}
                className="mt-3 w-full px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:opacity-90 active:scale-95 transition"
            >
                Clear Cart
            </button>
        </div>
    );
}
