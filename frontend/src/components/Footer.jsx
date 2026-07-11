import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo/logo.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="SkyRoute" className="h-8 w-auto" />
              <h4 className="font-bold text-lg text-gray-800">SkyRoute</h4>
            </div>
            <p className="text-gray-600 text-sm">Travel the world with us</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition"><FaFacebook /></a>
              <a href="#" className="text-gray-500 hover:text-sky-600 transition"><FaTwitter /></a>
              <a href="#" className="text-gray-500 hover:text-pink-600 transition"><FaInstagram /></a>
              <a href="#" className="text-gray-500 hover:text-red-600 transition"><FaYoutube /></a>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-gray-800">Quick Links</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-blue-600 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
              <li><Link to="/destinations" className="hover:text-blue-600 transition">Destinations</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-gray-800">Support</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-gray-800">Contact</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📞 +1234 567 8900</li>
              <li>✉️ info@skyroute.com</li>
              <li>📍 Garissa, Kenya</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm text-gray-500">
          © 2026 SkyRoute Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
