import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { cart, addItem, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const handleQtyChange = (product, delta) => {
        const newQty = product.qty + delta;
        if (newQty <= 0) {
            removeItem(product.id);
            toast.success(`${product.title} removed from cart`);
        } else {
            updateQty(product.id, newQty);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="text-center mt-20 text-gray-500">
                Your cart is empty
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">Your Cart</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Products list */}
                <div className="flex-1 space-y-4">
                    {cart.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white p-4 rounded-2xl shadow-[0_10px_25px_rgba(150,150,200,0.25)] hover:shadow-[0_12px_30px_rgba(150,150,200,0.35)] transition-all duration-300"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-32 h-32 sm:w-24 sm:h-24 object-contain rounded-xl"
                            />

                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="text-sm sm:text-base font-semibold line-clamp-2">{product.title}</h2>
                                <p className="text-xs sm:text-sm text-gray-500">{product.category}</p>
                                <p className="mt-1 text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
                                    ${product.price * product.qty}
                                </p>
                            </div>

                            <div className="flex items-center justify-center sm:flex-col gap-2 sm:gap-3 mt-2 sm:mt-0">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleQtyChange(product, -1)}
                                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                                    >
                                        -
                                    </button>
                                    <span className="px-2">{product.qty}</span>
                                    <button
                                        onClick={() => handleQtyChange(product, 1)}
                                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        removeItem(product.id);
                                        toast.success(`${product.title} removed from cart`);
                                    }}
                                    className="px-3 py-1 bg-red-500 text-white rounded-full hover:opacity-90 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pricing summary */}
                <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-[0_10px_25px_rgba(150,150,200,0.25)] flex flex-col gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Summary</h2>
                    <div className="flex justify-between text-sm sm:text-base">
                        <span>Items:</span>
                        <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base font-bold">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="w-full px-4 py-2 rounded-full font-medium bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:opacity-90 active:scale-95 transition"
                    >
                        Checkout
                    </button>

                    <button
                        onClick={clearCart}
                        className="w-full px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:opacity-90 active:scale-95 transition"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
