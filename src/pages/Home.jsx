import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import CategoriesFilter from "../components/CategoriesFilter";
import TrendingProducts from "../components/TrendingProducts";
import NewArrivals from "../components/NewArrivals";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

export default function Home({ search }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(false);
    const [maxPrice, setMaxPrice] = useState(0);
    const [sliderMax, setSliderMax] = useState(1000);

    async function fetchProducts() {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            setProducts(data);

            const highestPrice = Math.ceil(Math.max(...data.map((p) => p.price)));
            setSliderMax(highestPrice);
            setMaxPrice(highestPrice);

            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    async function fetchCategories() {
        try {
            const res = await fetch("https://fakestoreapi.com/products/categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!products.length) return;

        setFilterLoading(true);

        const timer = setTimeout(() => {
            let filtered = [...products];

            if (selectedCategory && selectedCategory !== "all") {
                filtered = filtered.filter((item) => item.category === selectedCategory);
            }

            filtered = filtered.filter((item) => item.price <= maxPrice);

            if (search && search.trim() !== "") {
                filtered = filtered.filter((item) =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            setDisplayProducts(filtered);
            setFilterLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [products, selectedCategory, maxPrice, search]);

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                    <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent animate-spin rounded-full"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading...</p>
                </div>
            ) : (
                <>
                    {products.length > 0 && <HeroSection products={products} />}

                    <section className="mt-12 mb-6">
                        <div className="flex flex-col items-center gap-6 w-full">
                            <div className="w-full flex justify-center">
                                <CategoriesFilter
                                    categories={["all", ...categories]}
                                    selected={selectedCategory}
                                    onSelect={setSelectedCategory}
                                    className="w-full sm:w-auto flex justify-center"
                                />
                            </div>

                            <div className="flex items-center w-full max-w-sm bg-white p-3 rounded-xl shadow gap-3 justify-center">
                                <span className="text-gray-700 font-medium whitespace-nowrap">
                                    Max: ${maxPrice}
                                </span>
                                <input
                                    type="range"
                                    min={0}
                                    max={sliderMax}
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full cursor-pointer"
                                />
                            </div>
                        </div>
                    </section>

                    {(!selectedCategory || selectedCategory === "all") && (
                        <>
                            <TrendingProducts products={displayProducts} onOpen={setSelectedProduct} />
                            <NewArrivals products={displayProducts} onOpen={setSelectedProduct} />
                        </>
                    )}

                    <div className="text-center mt-10 mb-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
                            {selectedCategory && selectedCategory !== "all"
                                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                                : "All Products"}
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Showing {displayProducts.length} item(s)
                        </p>
                    </div>

                    <div className="mt-10 mb-16">
                        {filterLoading ? (
                            <div className="flex justify-center py-16">
                                <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent animate-spin rounded-full"></div>
                            </div>
                        ) : displayProducts.length > 0 ? (
                            <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {displayProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onOpen={setSelectedProduct}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-600 py-12">No products found</p>
                        )}

                        <ProductModal
                            product={selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
