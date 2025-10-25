import React from "react";
import ProductCard from "./ProductCard";

export default function TrendingProducts({ products, onOpen }) {
    const trending = [...products]
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 4);

    return (
        <section className="mb-16">
            <h2 className="text-center text-3xl font-extrabold 
                bg-clip-text text-transparent bg-gradient-to-r 
                from-blue-500 to-purple-600 mb-6">
                Trending Products
            </h2>

            <div className="grid gap-8 grid-cols-2 sm:grid-cols-2 
                md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                {trending.map((product) => (
                    <div
                        key={product.id}
                        className="transform hover:scale-105 transition-all duration-300 w-full"
                    >
                        <ProductCard product={product} onOpen={onOpen} />
                    </div>
                ))}
            </div>
        </section>
    );
}
