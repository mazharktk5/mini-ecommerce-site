import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

export default function ProductCard({ product, onOpen }) {
    const { cart, addItem, removeItem } = useCart();
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        const found = cart.find((p) => p.id === product.id);
        setInCart(!!found);
    }, [cart, product.id]);

    const handleAddOrRemove = (e) => {
        e.stopPropagation();
        if (inCart) {
            removeItem(product.id);
            toast.success(`${product.title} removed from cart`);
        } else {
            addItem(product);
            toast.success(`${product.title} added to cart`);
        }
    };

    const filledStars = Math.round(product.rating?.rate || 0);

    return (
        <div
            className="bg-white rounded-2xl p-5 flex flex-col items-center text-center
        shadow-[0_10px_25px_rgba(150,150,200,0.25)]
        hover:shadow-[0_12px_30px_rgba(150,150,200,0.35)]
        transition-all duration-300 select-none cursor-pointer"
            onClick={() => onOpen(product)}
        >
            <div className="h-44 w-full flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-indigo-200/30"></div>
                <img
                    src={product.image}
                    alt={product.title}
                    className="relative max-h-40 object-contain hover:scale-110 transition-transform duration-300"
                />
            </div>

            <p className="text-[11px] font-medium text-pink-600 mb-1 uppercase tracking-wide">
                {product.category}
            </p>

            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10">
                {product.title}
            </h3>

            <div className="flex items-center gap-1 mt-1">
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

            <p className="mt-2 text-lg font-bold bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
                ${product.price}
            </p>

            <button
                onClick={handleAddOrRemove}
                className={`mt-3 w-full text-sm px-4 py-2 rounded-full font-medium transition-all duration-200
          ${inCart ? "bg-red-500 text-white hover:opacity-90 active:scale-95"
                        : "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:opacity-90 active:scale-95"}`}
            >
                {inCart ? "Remove from cart" : "Add to Cart"}
            </button>
        </div>
    );
}
