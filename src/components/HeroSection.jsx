import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl py-20 px-6 mb-12 shadow-lg text-center">
            <div className="container mx-auto flex flex-col items-center gap-6">

                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                    Discover. Shop. Enjoy.
                </h1>

                <p className="text-white text-lg max-w-xl">
                    Curated collections to fit your style. Browse, pick, and let your wardrobe shine.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition duration-200"
                >
                    Start Shopping
                </button>

            </div>
        </section>
    );
}
