import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const ContactHero = () => {
  const heroImage = '/images/air/image.png';

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[600px] lg:h-[80vh] bg-white">
      {/* Left Panel – 40% with curved right edge (border-radius) */}
      <div className="w-full lg:w-[40%] bg-white flex flex-col justify-between p-8 md:p-12 lg:p-16 rounded-r-[40%] shadow-2xl z-10">
        <div>
          {/* Logo without airplane – matches navbar exactly */}
          <div className="flex items-center gap-1 mb-6">
            <span className="text-2xl font-bold tracking-wider text-gray-800">SKYROUTE</span>
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">TRAVEL</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Contact Us</h1>
          <p className="text-gray-600 mt-4 leading-relaxed">We're here to help you plan your next journey. Contact us for bookings, travel inquiries, and customer support.</p>
          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <FaPhone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Phone</p>
                <p className="text-gray-600">+254 712 345 678</p>
                <p className="text-gray-600">+254 734 567 890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Email</p>
                <p className="text-gray-600">info@skyroute.com</p>
                <p className="text-gray-600">support@skyroute.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 flex-shrink-0">
                <FaMapMarkerAlt className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Address</p>
                <p className="text-gray-600">SkyRoute Travel Agency</p>
                <p className="text-gray-600">Garissa, Kenya</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 flex-shrink-0">
                <FaClock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Office Hours</p>
                <p className="text-gray-600">Monday – Friday: 8:00 AM – 6:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM – 3:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition">
            <FaFacebook className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 transition">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition">
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Right Panel – 60% image (full height, no clipping) */}
      <div className="w-full lg:w-[60%] h-[50vh] lg:h-full overflow-hidden">
        <img
          src={heroImage}
          alt="Airplane landing at sunset"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ContactHero;
