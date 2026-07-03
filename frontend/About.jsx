import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Users, 
  Shield,
  Compass,
  Clock,
  Heart,
  Star,
  Quote,
  Play,
  ChevronRight,
  Plane,
  Award,
  Briefcase,
  MapPin,
  Target,
  Eye,
  Building2,
  CheckCircle,
  Sparkles,
  Zap,
  Headphones,
  ThumbsUp,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const team = [
    { name: 'Abdi Rizack', role: 'CEO & Founder' },
    { name: 'Mohamed Hassan', role: 'Head of Operations' },
    { name: 'Sarah Wenjiku', role: 'Travel Experience Lead' },
    { name: 'Fatuma Mohamed', role: 'Head of Partnerships' },
    { name: 'Suleiman Abdulhi', role: 'Customer Success Lead' }
  ];

  const airlines = [
    'QATAR AIRWAYS',
    'KENYA AIRWAYS',
    'TURKISH AIRLINES',
    'EMIRATES',
    'ETHIOPIAN AIRLINES',
    'BRITISH AIRWAYS'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Nairobi, Kenya',
      quote: 'SkyRoute made our dream vacation to Dubai unforgettable. The service was impeccable!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      location: 'Singapore',
      quote: 'Best travel experience I\'ve ever had. Everything was perfectly organized.',
      rating: 5
    },
    {
      name: 'Amina Hassan',
      location: 'Dar es Salaam, Tanzania',
      quote: 'The team at SkyRoute went above and beyond to ensure our trip was perfect.',
      rating: 5
    }
  ];

  const features = [
    { 
      icon: Shield, 
      title: 'Best Price Guarantee', 
      desc: 'We offer the best prices at your round.',
      color: '#3b82f6',
      lightColor: '#dbeafe',
      step: '01'
    },
    { 
      icon: Compass, 
      title: 'Handpicked Experiences', 
      desc: 'Carefully selected flights, hotels and activities.',
      color: '#10b981',
      lightColor: '#d1fae5',
      step: '02'
    },
    { 
      icon: Users, 
      title: 'Expert Guidance', 
      desc: 'Our travel experts are here to help you.',
      color: '#8b5cf6',
      lightColor: '#ede9fe',
      step: '03'
    },
    { 
      icon: Clock, 
      title: 'Secure & Easy Booking', 
      desc: 'Book with confidence in just a few clicks.',
      color: '#f43f5e',
      lightColor: '#fce4ec',
      step: '04'
    },
    { 
      icon: Heart, 
      title: 'Trusted Worldwide', 
      desc: 'Over 10,000 travelers trust us globally.',
      color: '#f59e0b',
      lightColor: '#fef3c7',
      step: '05'
    }
  ];

  const stats = [
    { number: '50+', label: 'Countries', icon: Globe, color: 'from-blue-500 to-blue-600' },
    { number: '500+', label: 'Cities', icon: Building2, color: 'from-emerald-500 to-emerald-600' },
    { number: '1M+', label: 'Bookings', icon: Briefcase, color: 'from-purple-500 to-purple-600' },
    { number: '98%', label: 'Satisfaction', icon: Award, color: 'from-rose-500 to-rose-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-6">
              ✈️ Since 2015
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-4 tracking-tight">
              ABOUT SKYROUTE
            </h1>
            <p className="text-2xl md:text-3xl font-light text-gray-600 mb-2">More than travel.</p>
            <p className="text-2xl md:text-3xl font-light text-blue-600 mb-6">We create experiences.</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              SkyRoute Travel was founded with a simple belief – that every journey has the power to inspire, connect and transform.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We're here to make your travel seamless, memorable and truly extraordinary.
            </p>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[50%] overflow-hidden shadow-2xl border-4 border-blue-100">
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop" 
                alt="Travel Experience" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <p className="text-xs font-semibold text-blue-600 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Explore the World
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map & Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop" 
              alt="World Map" 
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/20 to-transparent"></div>
            <div className="absolute top-6 left-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-2xl border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-gray-800">🌍 Live Operations</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">24/7 Global Support</p>
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/95 backdrop-blur-sm rounded-full px-8 py-3 shadow-2xl border border-white/20">
                <p className="text-sm font-semibold text-blue-600 flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  50+ Countries • 500+ Cities • 24/7 Support
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-3">
              <span className="w-10 h-0.5 bg-blue-600"></span>
              GLOBAL REACH
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Connecting the World</h2>
            <p className="text-gray-500 text-sm mb-8">From tropical beaches to historic cities, we bring the world closer to you.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{stat.number}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  <div className={`w-8 h-0.5 bg-gradient-to-r ${stat.color} mt-3 rounded-full group-hover:w-12 transition-all duration-300`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose SkyRoute */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm mb-3">
            <span className="w-12 h-0.5 bg-blue-600"></span>
            WHY SKYROUTE
            <span className="w-12 h-0.5 bg-blue-600"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose SkyRoute?</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We make your travel seamless, memorable and truly extraordinary
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-300 via-blue-400 to-blue-300"></div>
          
          <div className="space-y-12 lg:space-y-0">
            {features.map((feature, index) => (
              <div key={index} className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg z-10"
                  style={{ background: feature.color }}>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ background: feature.color }}></div>
                </div>

                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1 border border-gray-100">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold text-white mb-4`}
                      style={{ background: feature.color }}>
                      Step {feature.step}
                    </div>
                    
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110`}
                      style={{ background: feature.lightColor }}>
                      <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-500 leading-relaxed">
                      {feature.desc}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ color: feature.color }}>
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-8 py-4 shadow-lg">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow">JD</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow">MK</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow">AR</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow">SM</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow">+</div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Trusted by <span className="text-blue-600 text-lg">10,000+</span> travelers worldwide
              </p>
              <p className="text-xs text-gray-400">⭐ 4.9/5 average rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm mb-2">
            <span className="w-10 h-0.5 bg-blue-600"></span>
            OUR PURPOSE
            <span className="w-10 h-0.5 bg-blue-600"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Mission & Vision</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-600 hover:shadow-2xl transition group">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
              <Target className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To make travel accessible, affordable and safe. We believe that travel is a universal right. We are committed to making travel accessible to everyone.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-400 hover:shadow-2xl transition group">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
              <Eye className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the world's most trusted travel company, inspiring people to explore the world with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Trusted Partners - COMPLETELY NO BACKGROUNDS */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm mb-2">
            <span className="w-10 h-0.5 bg-blue-600"></span>
            PARTNERS
            <span className="w-10 h-0.5 bg-blue-600"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Trusted Partners</h2>
          <p className="text-gray-500 mt-2">We fly with the best airlines in the world</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {airlines.map((airline, index) => (
            <span 
              key={index} 
              className="text-gray-700 font-medium text-sm tracking-wide hover:text-blue-600 transition-colors"
            >
              {airline}
            </span>
          ))}
        </div>
      </div>

      {/* Team - Clean Version */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm mb-2">
            <span className="w-10 h-0.5 bg-blue-600"></span>
            OUR TEAM
            <span className="w-10 h-0.5 bg-blue-600"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Meet the People Behind Your Journeys</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            A passionate team dedicated to making every trip smooth, memorable and extraordinary.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition transform group-hover:scale-105">
                <span className="text-3xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h4 className="font-bold text-gray-800 text-lg mt-4">{member.name}</h4>
              <p className="text-sm text-blue-600 font-medium">{member.role}</p>
              <div className="w-12 h-0.5 bg-blue-400 mt-2 group-hover:w-20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm mb-2">
            <span className="w-10 h-0.5 bg-blue-600"></span>
            TESTIMONIALS
            <span className="w-10 h-0.5 bg-blue-600"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Travelers Say</h2>
          <p className="text-gray-500 mt-2">Real stories from real travelers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Create Your Next Memory?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Let's turn your travel dreams into reality. Start exploring today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/destinations"
              className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 hover:shadow-2xl transition transform hover:scale-105 text-lg"
            >
              Explore Now
            </Link>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white/20 transition text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
