import React from "react";
import { X, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

export default function ProductModal({ product, onClose }) {
    const { addItem } = useCart();

    if (!product) return null;

    const filledStars = Math.round(product.rating?.rate || 0);

    const handleAddToCart = () => {
        addItem(product);
        toast.success(`${product.title} added to cart`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-[90%] max-w-3xl overflow-hidden shadow-2xl animate-[fadeIn_0.25s_ease] relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-1 rounded-full shadow hover:bg-white transition"
                >
                    <X size={22} className="text-gray-700" />
                </button>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

                    {/* Product Image */}
                    <div className="flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-52 object-contain drop-shadow-lg hover:scale-105 transition"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {product.title}
                            </h2>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mt-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < filledStars ? "text-yellow-500" : "text-gray-300"}`}
                                        fill={i < filledStars ? "#facc15" : "none"}
                                    />
                                ))}
                                <span className="text-xs text-gray-500 ml-1">
                                    ({product.rating?.count || 0})
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-5">
                                {product.description}
                            </p>
                        </div>

                        {/* Price + Button */}
                        <div>
                            <p className="mt-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                                ${product.price}
                            </p>

                            <button
                                onClick={handleAddToCart}
                                className="mt-4 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-full hover:opacity-90 active:scale-95 transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
