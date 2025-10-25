import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

import HeroSection from "../components/HeroSection";
import CategoriesFilter from "../components/CategoriesFilter";
import TrendingProducts from "../components/TrendingProducts";
import NewArrivals from "../components/NewArrivals";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

export default function Home() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sliderMax, setSliderMax] = useState(1000); // slider max independent

    const { cartItems } = useCart();
    const location = useLocation();
    const searchText = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

    // Fetch all products
    async function fetchProducts() {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            setProducts(data);
            setDisplayProducts(data);

            // Dynamically set slider max to highest product price
            const highestPrice = Math.ceil(Math.max(...data.map(p => p.price)));
            setMaxPrice(highestPrice);
            setSliderMax(highestPrice);

            setLoading(false);
        } catch {
            setLoading(false);
        }
    }

    // Fetch categories
    async function fetchCategories() {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data);
    }

    useEffect(() => {
        setLoading(true);
        fetchProducts();
        fetchCategories();
    }, []);

    // Filter products whenever maxPrice, category, search, or products change
    useEffect(() => {
        if (!products.length) return;

        let filtered = products
            .filter(item => item.price <= maxPrice)
            .filter(item => item.title.toLowerCase().includes(searchText));

        if (selectedCategory) {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        setDisplayProducts(filtered);
    }, [maxPrice, selectedCategory, products, searchText]);

    return (
        <div className="container mx-auto px-4">

            {products.length > 0 && <HeroSection products={products} />}

            {/* Categories & Price Filter */}
            <section className="mt-12 mb-6">
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">

                    {/* Categories */}
                    <CategoriesFilter
                        categories={categories}
                        selected={selectedCategory}
                        onSelect={setSelectedCategory}
                    />

                    {/* Price Filter */}
                    <div className="inline-flex items-center bg-white p-3 rounded-xl shadow gap-3">
                        <span className="text-gray-700 font-medium whitespace-nowrap">
                            Max: ${maxPrice}
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={sliderMax} // use separate sliderMax
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="h-2 w-40 md:w-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full cursor-pointer"
                        />
                    </div>
                </div>
            </section>

            {!selectedCategory && (
                <>
                    <TrendingProducts products={products} onOpen={setSelectedProduct} />
                    <NewArrivals products={products} onOpen={setSelectedProduct} />
                </>
            )}

            {/* Product Grid */}
            <div className="text-center mt-10 mb-6">
                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
                    {selectedCategory
                        ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                        : "All Products"}
                </h2>
                <p className="text-gray-600 text-sm">
                    Showing {displayProducts.length} item(s)
                </p>
            </div>

            <div className="mt-10">
                {loading ? (
                    <p className="text-center text-gray-600 py-12">
                        Loading products...
                    </p>
                ) : displayProducts.length > 0 ? (
                    <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16">
                        {displayProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onOpen={setSelectedProduct}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 py-12">
                        No products found
                    </p>
                )}

                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            </div>
        </div>
    );
}
