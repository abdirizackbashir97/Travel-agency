import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, Hotel, Package, Shield, 
  Clock, Users, Globe, Award, CheckCircle,
  MapPin, Calendar, Star, TrendingUp,
  ChevronRight, Headphones, Lock,
  Briefcase, FileText
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  // Team members data
  const teamMembers = [
    {
      name: 'John Mwangi',
      role: 'CEO & Founder',
      image: '👨‍💼',
      bg: 'bg-blue-100'
    },
    {
      name: 'Sarah Wanjiku',
      role: 'Travel Consultant',
      image: '👩‍💼',
      bg: 'bg-pink-100'
    },
    {
      name: 'Brian Otieno',
      role: 'Operations Manager',
      image: '👨‍💻',
      bg: 'bg-green-100'
    },
    {
      name: 'Aisha Ahmed',
      role: 'Customer Support',
      image: '👩‍💻',
      bg: 'bg-purple-100'
    }
  ];

  // Services data
  const services = [
    { icon: Plane, label: 'Flight Booking', color: 'blue' },
    { icon: Hotel, label: 'Hotel Reservation', color: 'green' },
    { icon: Package, label: 'Holiday Packages', color: 'orange' },
    { icon: MapPin, label: 'Airport Transfers', color: 'purple' },
    { icon: Shield, label: 'Travel Insurance', color: 'red' },
    { icon: FileText, label: 'Visa Assistance', color: 'indigo' },
    { icon: Briefcase, label: 'Business Travel', color: 'teal' },
    { icon: Headphones, label: '24/7 Support', color: 'rose' },
  ];

  // Stats data
  const stats = [
    { number: '100+', label: 'Destinations Worldwide', icon: Globe },
    { number: '5,000+', label: 'Flights Booked', icon: Plane },
    { number: '2,000+', label: 'Hotel Partners', icon: Hotel },
    { number: '10,000+', label: 'Happy Travelers', icon: Users },
    { number: '98%', label: 'Customer Satisfaction', icon: Star },
  ];

  // Why Choose Us
  const reasons = [
    { icon: Award, label: 'Affordable travel packages', desc: 'Best prices guaranteed' },
    { icon: CheckCircle, label: 'Easy and user-friendly platform', desc: 'Book in minutes' },
    { icon: Lock, label: 'Secure online booking', desc: '100% safe payments' },
    { icon: Users, label: 'Experienced travel consultants', desc: 'Expert guidance' },
    { icon: Star, label: 'Trusted travel partners', desc: 'Verified providers' },
    { icon: Clock, label: 'Fast booking confirmation', desc: 'Instant confirmation' },
    { icon: Headphones, label: '24/7 customer support', desc: 'We are here to help' },
    { icon: Shield, label: 'Safe and reliable payment', desc: 'Multiple payment options' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">Your Journey, Our Passion</p>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto mt-2">
            At SkyRoute Travel Agency, we turn your travel dreams into unforgettable experiences.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              SkyRoute Travel Agency was founded with a simple goal – to make travel easier, more affordable, 
              and more memorable for everyone. From flight bookings to dream vacations, we are dedicated to 
              helping people explore the world with confidence and ease.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-bold text-blue-600">Our Mission</h4>
                <p className="text-sm text-gray-600">To provide reliable, affordable, and personalized travel services.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <h4 className="font-bold text-purple-600">Our Vision</h4>
                <p className="text-sm text-gray-600">To become one of the most trusted travel agencies worldwide.</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Travel with Confidence</h3>
              <p className="text-blue-100">We believe every journey should be seamless, enjoyable, and memorable. 
                With SkyRoute, you're not just booking a trip – you're creating a story.</p>
              <button 
                onClick={() => navigate('/destinations')}
                className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg transition inline-flex items-center gap-2"
              >
                Explore Destinations <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const colorMap = {
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                orange: 'bg-orange-100 text-orange-600',
                purple: 'bg-purple-100 text-purple-600',
                red: 'bg-red-100 text-red-600',
                indigo: 'bg-indigo-100 text-indigo-600',
                teal: 'bg-teal-100 text-teal-600',
                rose: 'bg-rose-100 text-rose-600',
              };
              return (
                <div key={index} className="text-center p-4 rounded-xl hover:shadow-md transition group">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${colorMap[service.color]} flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">{service.label}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why Choose SkyRoute */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose SkyRoute?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm">{reason.label}</h4>
                  </div>
                  <p className="text-xs text-gray-500 ml-11">{reason.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index}>
                  <div className="flex justify-center mb-2">
                    <Icon className="w-8 h-8 text-blue-200" />
                  </div>
                  <div className="text-3xl font-bold">{stat.number}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Meet Our Team</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our passionate team of travel experts works tirelessly to ensure every journey is smooth and memorable.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className={`w-24 h-24 mx-auto ${member.bg} rounded-2xl flex items-center justify-center text-5xl group-hover:scale-110 transition duration-300 mb-3`}>
                  {member.image}
                </div>
                <h4 className="font-semibold text-gray-800">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Discover amazing destinations, book your flights and hotels with ease, 
            and let SkyRoute make your dream vacation a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/destinations')}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Explore Destinations
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/booking')}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
