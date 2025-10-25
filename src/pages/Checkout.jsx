import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { cart, totalItems, totalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        if (cart.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        setLoading(true);

        // Simulate order processing
        setTimeout(() => {
            setLoading(false);
            setShowConfirmation(true);
            clearCart();
        }, 1500);
    };

    if (cart.length === 0 && !showConfirmation) {
        return (
            <div className="text-center mt-20 text-gray-500">
                Your cart is empty
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Cart Items */}
                <div className="flex-1 space-y-4">
                    {cart.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-[0_10px_25px_rgba(150,150,200,0.25)] hover:shadow-[0_12px_30px_rgba(150,150,200,0.35)] transition-all duration-300"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-20 h-20 object-contain rounded-xl"
                            />
                            <div>
                                <h2 className="text-sm font-semibold line-clamp-2">{product.title}</h2>
                                <p className="text-xs text-gray-500">{product.category}</p>
                            </div>
                            <p className="ml-auto font-bold bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
                                ${product.price * product.qty}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Pricing & Delivery Summary */}
                <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-[0_10px_25px_rgba(150,150,200,0.25)] space-y-4">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                    <div className="flex justify-between">
                        <span>Items ({totalItems})</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                        <h3 className="font-semibold mb-2">Delivery Details</h3>
                        <input type="text" placeholder="Full Name" className="p-2 border rounded-md w-full" />
                        <input type="text" placeholder="Address" className="p-2 border rounded-md w-full" />
                        <input type="text" placeholder="City" className="p-2 border rounded-md w-full" />
                        <input type="text" placeholder="Phone Number" className="p-2 border rounded-md w-full" />
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className={`w-full mt-4 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:opacity-90 active:scale-95 transition flex justify-center items-center gap-2`}
                        disabled={loading}
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>
                </div>
            </div>

            {/* Confirmation Card */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-r from-pink-500 to-indigo-500 p-6 rounded-3xl shadow-2xl w-80 text-center animate-[fadeIn_0.3s_ease]">
                        <h2 className="text-2xl font-bold text-white mb-4">🎉 Order Placed!</h2>
                        <p className="text-white/90 mb-6">Your order has been successfully placed.</p>
                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-2 rounded-full bg-white text-gray-900 font-semibold hover:opacity-90 active:scale-95 transition"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
