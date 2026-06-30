import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TA</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TravelAgency</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-sm">
              Discover the world with curated travel experiences. Book flights, hotels, and tours with confidence.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Contact</Link></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Destinations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Paris, France</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Tokyo, Japan</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">New York, USA</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Dubai, UAE</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© {currentYear} TravelAgency. All rights reserved.</p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Made with <FaHeart className="w-4 h-4 text-red-500" /> for travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
