import React from "react";
import ProductCard from "./ProductCard";

export default function NewArrivals({ products, onAdd, onOpen }) {
    const arrivals = [...products].reverse().slice(0, 4);

    return (
        <section className="mb-16">
            <h2 className="text-center text-3xl font-extrabold 
                bg-clip-text text-transparent bg-gradient-to-r 
                from-purple-500 to-pink-600 mb-6">
                New Arrivals
            </h2>

            <div className="grid gap-8 grid-cols-2 sm:grid-cols-2 
                md:grid-cols-3 lg:grid-cols-4 justify-items-center">

                {arrivals.map(product => (
                    <div
                        key={product.id}
                        className="transform hover:scale-105 transition-all duration-300 w-full"
                    >
                        <ProductCard
                            product={product}
                            onAdd={() => onAdd(product)}
                            onOpen={onOpen}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
