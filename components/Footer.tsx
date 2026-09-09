"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">BUYnGO</h2>
          <p className="mt-2 text-sm">
            Cozy, modern shopping experience built with ❤️ by Gumball
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/user-dashboard" className="hover:text-white">My Orders</a></li>
            <li><a href="/login" className="hover:text-white">login</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p className="mt-2 text-sm">📧 support@bellavista.com</p>
          <p className="text-sm">📍 Konya, Türkiye</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} BUYnGO. All rights reserved.
      </div>
    </footer>
  );
}
