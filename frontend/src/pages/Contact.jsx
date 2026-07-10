import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import ContactMap from '../components/contact/ContactMap';
import ContactCTA from '../components/contact/ContactCTA';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContactHero />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <ContactMap />
        <ContactCTA />
      </div>
    </div>
  );
};

export default Contact;
