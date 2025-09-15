import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/logo.jpg" alt="FAARUUQ Logo" className="h-8 mr-2" />
              <span className="font-bold text-gray-800 dark:text-white">FAARUUQ</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted bookstore for Somali, Arabic, English, and French literature. 
              We bring knowledge to every home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a></li>
              <li><a href="/products" className="hover:text-blue-600 dark:hover:text-blue-400">Books</a></li>
              <li><a href="/stationery" className="hover:text-blue-600 dark:hover:text-blue-400">Stationery</a></li>
              <li><a href="/userorders" className="hover:text-blue-600 dark:hover:text-blue-400">My Orders</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>+252 61 123 4567</li>
              <li>info@faaruuqbooks.com</li>
              <li>Mogadishu, Somalia</li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center mt-8 space-x-6">
          <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <FaYoutube size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} FAARUUQ Books. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;