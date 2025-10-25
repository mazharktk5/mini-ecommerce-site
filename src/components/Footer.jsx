import React from "react";
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300 pt-14 pb-8 mt-20">
            {/* Top Section */}
            <div className="container mx-auto px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Trendify
                    </h2>
                    <p classname="text-sm text-gray-400 mt-3 leading-relaxed">
                        A stylish online store delivering top quality products with pride.
                    </p>

                    <div className="flex gap-4 mt-5">
                        {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                            <Icon
                                key={i}
                                className="w-5 h-5 cursor-pointer hover:text-white transition"
                            />
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer transition">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer transition">
                            <Link to="/shop">Shop</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer transition">
                            <Link to="/cart">Cart</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer transition">
                            <Link to="/checkout">Checkout</Link>
                        </li>
                    </ul>
                </div>


                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer transition">
                            Customer Service
                        </li>
                        <li className="hover:text-white cursor-pointer transition">
                            Terms & Conditions
                        </li>
                        <li className="hover:text-white cursor-pointer transition">
                            Privacy Policy
                        </li>
                        <li className="hover:text-white cursor-pointer transition">FAQs</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                    <div className="flex items-center gap-3 mb-2 text-sm">
                        <Mail className="w-5" /> support@trendify.com
                    </div>
                    <div className="flex items-center gap-3 mb-2 text-sm">
                        <Phone className="w-5" /> +92 300 1234567
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-5" /> Peshawar, Pakistan
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center border-t border-gray-800 mt-12 pt-5 text-sm text-gray-500">
                © {new Date().getFullYear()} Trendify. All rights reserved.
            </div>
        </footer>
    );
}
