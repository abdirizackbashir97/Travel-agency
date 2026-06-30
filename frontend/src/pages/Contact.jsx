import React from 'react';

const Contact = () => {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
              <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea rows="4" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"></textarea>
            </div>
            <button type="submit" className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
              Send Message
            </button>
          </form>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">123 Travel Street, Adventure City, AC 12345</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">info@travelagency.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
