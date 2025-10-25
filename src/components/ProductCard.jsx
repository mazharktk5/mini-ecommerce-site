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
            className="bg-white rounded-2xl p-4 xs:p-5 sm:p-6 flex flex-col items-center text-center
                       shadow-[0_8px_20px_rgba(150,150,200,0.15)]
                       hover:shadow-[0_10px_25px_rgba(150,150,200,0.25)]
                       transition-all duration-300 select-none cursor-pointer w-full max-w-xs"
            onClick={() => onOpen(product)}
        >
            {/* Image */}
            <div className="w-full h-36 sm:h-40 md:h-44 flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-indigo-200/30"></div>
                <img
                    src={product.image}
                    alt={product.title}
                    className="relative max-h-full object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Category */}
            <p className="text-[10px] xs:text-[11px] sm:text-[12px] font-medium text-pink-600 mb-1 uppercase tracking-wide">
                {product.category}
            </p>

            {/* Title */}
            <h3 className="text-sm xs:text-sm sm:text-base md:text-base font-semibold text-gray-800 line-clamp-2 h-10 sm:h-12">
                {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 ${i < filledStars ? "text-yellow-500" : "text-gray-300"}`}
                        fill={i < filledStars ? "#facc15" : "none"}
                    />
                ))}
                <span className="text-xs xs:text-sm text-gray-500 ml-1">
                    ({product.rating?.count || 0})
                </span>
            </div>

            {/* Price */}
            <p className="mt-2 text-base xs:text-lg sm:text-lg md:text-xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
                ${product.price}
            </p>

            {/* Button */}
            <button
                onClick={handleAddOrRemove}
                className={`mt-3 w-full text-xs xs:text-sm sm:text-sm md:text-base px-3 xs:px-4 py-2 xs:py-2.5 rounded-full font-medium transition-all duration-200
                           ${inCart
                        ? "bg-red-500 text-white hover:opacity-90 active:scale-95"
                        : "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:opacity-90 active:scale-95"
                    }`}
            >
                {inCart ? "Remove from cart" : "Add to Cart"}
            </button>
        </div>
    );
}
