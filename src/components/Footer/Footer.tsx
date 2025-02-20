import React from "react";

const Footer2: React.FC = () => {
  return (
    <footer className="!py-6 !bg-gray-700 !text-gray-300">
      <div className="!max-w-6xl !mx-auto !px-6">
        <div className="!grid !grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 !gap-6 !text-center md:!text-left">
          <div>
            <h2 className="!text-2xl !font-semibold !text-white">MediCare</h2>
            <p className="!mt-2 !text-sm !text-gray-400">
              Your health, our priority. Trusted care, always.
            </p>
          </div>
          <div>
            <h3 className="!text-lg !font-medium !text-gray-100 ">Quick Links</h3>
            <ul className="!mt-3 !space-y-2 !text-sm">
              <li><a href="/" className="!text-gray-400 hover:!text-white !transition">Home</a></li>
              <li><a href="/about" className="!text-gray-400 hover:!text-white !transition">About Us</a></li>
              <li><a href="/services" className="!text-gray-400 hover:!text-white !transition">Services</a></li>
              <li><a href="/contact" className="!text-gray-400 hover:!text-white !transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="!text-lg !font-medium !text-white">Contact Us</h3>
            <p className="!mt-3 !text-sm !text-gray-400">📍 123 Health St, City, Country</p>
            <p className="!text-sm !text-gray-400">📧 support@medicare.com</p>
            <p className="!text-sm !text-gray-400">📞 +123 456 7890</p>
          </div>
        </div>
        <div className="!border-t !border-gray-400 !mt-6 !pt-4 !text-center !text-xs !text-gray-400">
          &copy; {new Date().getFullYear()} MediCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
