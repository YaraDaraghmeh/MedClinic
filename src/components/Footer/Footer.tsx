import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-gray-300" style={{ background: "linear-gradient(135deg, #4e79b0, #0f4c75)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-xl font-semibold text-white">MediCare</h2>
            <p className="mt-2 text-sm text-gray-300">
              Your health, our priority. Trusted care, always.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-100">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-300 transition">Home</a></li>
              <li><a href="/about" className="hover:text-blue-300 transition">About Us</a></li>
              <li><a href="/services" className="hover:text-blue-300 transition">Services</a></li>
              <li><a href="/contact" className="hover:text-blue-300 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-100">Contact Us</h3>
            <p className="mt-3 text-sm">📍 123 Health St, City, Country</p>
            <p className="text-sm">📧 support@medicare.com</p>
            <p className="text-sm">📞 +123 456 7890</p>
          </div>
        </div>
        <div className="border-t border-gray-400 mt-6 pt-4 text-center text-xs text-gray-300">
          &copy; {new Date().getFullYear()} MediCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
