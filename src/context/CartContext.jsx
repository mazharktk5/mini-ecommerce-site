import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const raw = localStorage.getItem("cart");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addItem(product) {
        setCart(prev => {
            const found = prev.find(p => p.id === product.id);
            if (found) {
                return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    }

    function removeItem(id) {
        setCart(prev => prev.filter(p => p.id !== id));
    }

    function updateQty(id, qty) {
        setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p));
    }

    function clearCart() {
        setCart([]);
    }

    const totalItems = cart.reduce((s, p) => s + p.qty, 0);
    const totalPrice = cart.reduce((s, p) => s + p.qty * p.price, 0);

    const value = {
        cart,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
