import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ContactMap = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl mt-16">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853743783!2d36.682197!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1699888888888!5m2!1sen!2s"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="SkyRoute Location"
        className="w-full"
      />
      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <FaMapMarkerAlt className="w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">SkyRoute Travel Agency</p>
          <p className="text-sm text-gray-600">Garissa, Kenya</p>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
