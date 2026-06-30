import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Globe, Hotel, Calendar, Award, Shield, 
  Headphones, Compass, Clock, Star, Heart, 
  ArrowRight, CheckCircle, MapPin, Plane,
  Quote, BookOpen, Target, Rocket, Sparkles
} from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '12K+', label: 'Happy Travelers' },
    { icon: Globe, value: '120+', label: 'Countries Reached' },
    { icon: Hotel, value: '5K+', label: 'Hotel Partners' },
    { icon: Calendar, value: '8K+', label: 'Successful Bookings' },
    { icon: Users, value: '50+', label: 'Expert Team' },
    { icon: Award, value: '4.9★', label: 'Average Rating' },
  ];

  const reasons = [
    { 
      icon: Shield, 
      title: 'Trusted & Secure',
      description: 'Your safety and privacy are our top priorities.'
    },
    { 
      icon: Award, 
      title: 'Best Price Guarantee',
      description: 'We offer the best deals and exclusive discounts.'
    },
    { 
      icon: Headphones, 
      title: '24/7 Support', 
      description: 'Our travel experts are always here to help you.'
    },
    { 
      icon: Compass, 
      title: 'Handpicked Experiences',
      description: 'Curated destinations for unforgettable trips.'
    },
  ];

  const team = [
    {
      name: 'Abdi Rizack Bashir',
      role: 'CEO & Founder',
      initials: 'AR'
    },
    {
      name: 'Fartun Ahmed',
      role: 'Head of Operations',
      initials: 'FA'
    },
    {
      name: 'Safia Hassan',
      role: 'Travel Experience Director',
      initials: 'SH'
    },
    {
      name: 'Michael Anderson',
      role: 'Customer Relations Manager',
      initials: 'MA'
    },
  ];

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="bg-blue-600 py-24">
        <div className="container text-center text-white">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6">
              Since 2018
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              About Us
            </h1>
            <p className="text-2xl font-light text-blue-100 mb-3">
              Creating Journeys,
            </p>
            <p className="text-3xl md:text-4xl font-bold text-white mb-6">
              Building Memories
            </p>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              At TravelEase, we believe travel is more than visiting new places — 
              it's about creating unforgettable experiences that stay with you forever.
            </p>
            <Link 
              to="/destinations" 
              className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Discover Our Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Travel Made Simple,
                <br />
                <span className="text-blue-600">Memories Made Forever</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2018, TravelEase was born out of a passion for exploration 
                and a commitment to making travel effortless for everyone.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                What started as a small team of travel enthusiasts has grown into a trusted platform, 
                helping thousands of travelers discover the world with confidence.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Our Mission</h4>
                  <p className="text-sm text-gray-500">To inspire and empower people to explore the world with ease.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Our Vision</h4>
                  <p className="text-sm text-gray-500">To be the most trusted travel companion worldwide.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop" 
                alt="Travel" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&h=400&fit=crop" 
                  alt="Adventure" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-16 bg-blue-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="text-gray-500 mt-2">We Make Travel Better</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{reason.title}</h3>
                  <p className="text-sm text-gray-500">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className="py-20 bg-blue-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
            <p className="text-gray-500 mt-2">
              A passionate team of travel experts dedicated to making your journeys unforgettable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-blue-600">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Travelers Say</h2>
            <p className="text-gray-500 mt-2">Real experiences from real people</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Fatima Hassan',
                location: 'Mogadishu, Somalia',
                text: 'TravelEase made my Hajj trip absolutely unforgettable. From booking to the actual experience, everything was flawless. The team took care of every detail.',
              },
              {
                name: 'Ahmed Ali',
                location: 'Hargeisa, Somaliland',
                text: 'The Dubai family package was beyond expectations. Our kids had the time of their lives. TravelEase is now our go-to travel partner for every holiday.',
              },
              {
                name: 'Michael Chen',
                location: 'Singapore',
                text: 'The Kenya safari package was incredible. Every detail was perfectly planned. I\'ve traveled with many agencies, but TravelEase is truly the best.',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 bg-blue-600">
        <div className="container text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Let us help you plan the trip of a lifetime.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/destinations"
              className="px-6 py-2.5 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              Explore Destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
