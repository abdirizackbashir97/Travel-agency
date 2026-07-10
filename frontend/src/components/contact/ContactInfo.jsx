import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
      <div className="space-y-5">
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
            <p className="text-gray-600">Mon–Fri: 8:00 AM – 6:00 PM</p>
            <p className="text-gray-600">Sat: 9:00 AM – 3:00 PM</p>
            <p className="text-gray-600">Sun: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
