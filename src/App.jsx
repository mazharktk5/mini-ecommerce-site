import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // import Toaster
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Toaster should be here once at the top level */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            fontSize: "14px",
            borderRadius: "8px",
            background: "#111",
            color: "#fff",
          },
        }}
      />

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
