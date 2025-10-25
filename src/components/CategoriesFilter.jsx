import React from "react";

export default function CategoriesFilter({ categories, selected, onSelect }) {
    // Ensure "all" is first and no duplicates
    const allCategories = ["all", ...categories.filter(cat => cat.toLowerCase() !== "all")];

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-wrap gap-3 justify-center py-4 mb-10 px-4">
                {allCategories.map((cat) => {
                    const isActive = selected.toLowerCase() === cat.toLowerCase();

                    return (
                        <button
                            key={cat}
                            onClick={() => onSelect(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold 
                                transition-all duration-200 shadow-md 
                                border border-transparent
                                ${isActive
                                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white scale-110 shadow-lg"
                                    : "bg-gray-200 text-gray-900 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:text-white hover:scale-105"
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
