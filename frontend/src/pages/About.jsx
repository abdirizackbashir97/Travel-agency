import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Plane,
  Hotel,
  Package,
  MapPin,
  Shield,
  Headphones,
  Lock,
  Award,
  Users,
  Star,
  Quote,
} from 'lucide-react';

const heroImage = '/asset/image/image_1.png';

const About = () => {
  const navigate = useNavigate();

  const services = [
    { icon: Plane, title: 'Flight Booking', desc: 'Domestic & international flights at the best prices.' },
    { icon: Hotel, title: 'Hotel Booking', desc: 'Complete worldwide hotel reservations.' },
    { icon: Package, title: 'Tour Packages', desc: 'Arriving holiday & tour packages.' },
    { icon: MapPin, title: 'Travel Planning', desc: 'Personalized itineraries for your trips.' },
    { icon: Shield, title: 'Secure Payment', desc: 'Safe and secure online payments.' },
    { icon: Headphones, title: '24/7 Support', desc: 'We are here to help you anytime.' },
  ];

  const values = [
    { icon: Users, title: 'Customer First', desc: 'We put our customers at the heart of everything we do.' },
    { icon: Shield, title: 'Integrity', desc: 'Honest, transparent and trustworthiness services.' },
    { icon: Award, title: 'Quality', desc: 'We deliver the highest quality in everything we offer.' },
    { icon: Star, title: 'Innovation', desc: 'Consistently improving and embracing new ideas.' },
    { icon: Plane, title: 'Passion', desc: 'We love travel and it shines in our services.' },
    { icon: Headphones, title: 'Reliability', desc: 'You can count on us for a smooth journey.' },
  ];

  const team = [
    {
      name: 'Abdulbaset Mohamed',
      role: 'CEO & Founder',
      intro: 'Passionate about connecting people with unforgettable travel experiences.',
    },
    {
      name: 'Amine Hassen',
      role: 'Operations Manager',
      intro: 'Ensuring every trip runs smoothly from start to finish.',
    },
    {
      name: 'Omer Ali',
      role: 'Travel Consultant',
      intro: 'Expert in crafting personalized itineraries for every traveler.',
    },
    {
      name: 'Fateme Ahmed',
      role: 'Customer Support Lead',
      intro: 'Dedicated to providing exceptional support at every step.',
    },
    {
      name: 'Yusuf K.',
      role: 'Marketing Manager',
      intro: 'Connecting travelers with their dream destinations through innovative campaigns.',
    },
  ];

  const testimonials = [
    {
      name: 'Maryam & Abdullah',
      location: 'Garissa, Kenya',
      review: 'SkyRoute made our honeymoon trip perfectly perfect! Everything was well organised and unforgettable.',
      rating: 5,
    },
    {
      name: 'Halima Ali',
      location: 'Mombasa, Kenya',
      review: 'Best travel agency I have ever used. Great prices, friendly support and amazing customer experience!',
      rating: 5,
    },
    {
      name: 'Abdi Rashid',
      location: 'Nairobi, Kenya',
      review: 'Our family vacation to Zanzibar was beyond our expectations, highly recommended!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-blue-900">
        <img
          src={heroImage}
          alt="Discover the World"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #1e3a5f, #0a1628)';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Discover the World <br />with SkyRoute</h1>
              <p className="mt-4 text-lg md:text-xl text-blue-100">
                We are passionate about travel and committed to creating unforgettable experiences
                for our customers around the world.
              </p>
              <button
                onClick={() => navigate('/destinations')}
                className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-xl transition hover:scale-105"
              >
                Explore Destinations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* WHO WE ARE */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Your Trusted Travel Partner</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              SkyRoute Travel Agency is a full-service travel company dedicated to making your
              travel dreams a reality. Whether you are planning a vacation, business trip,
              honeymoon, or adventure, we provide the best travel solutions tailored to your needs.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-blue-600">✓</span> Best price guarantee</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-blue-600">✓</span> Expert travel consultants</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-blue-600">✓</span> 24/7 customer support</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-blue-600">✓</span> Safe & secure booking</div>
            </div>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Learn More About Us
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-6 rounded-xl text-center"><p className="text-3xl font-bold text-blue-600">10,000+</p><p className="text-sm text-gray-500">Happy Travelers</p></div>
            <div className="bg-blue-50 p-6 rounded-xl text-center"><p className="text-3xl font-bold text-blue-600">150+</p><p className="text-sm text-gray-500">Destinations</p></div>
            <div className="bg-blue-50 p-6 rounded-xl text-center"><p className="text-3xl font-bold text-blue-600">50+</p><p className="text-sm text-gray-500">Partner Airlines</p></div>
            <div className="bg-blue-50 p-6 rounded-xl text-center"><p className="text-3xl font-bold text-blue-600">24/7</p><p className="text-sm text-gray-500">Customer Support</p></div>
          </div>
        </div>
      </div>

      {/* SERVICES CAROUSEL */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Complete Travel Solutions</h2>
            <p className="mt-2 text-gray-500">Explore our wide range of travel services</p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <SwiperSlide key={idx}>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition border border-gray-100 h-full">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-800">{service.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{service.desc}</p>
                    <button className="mt-4 text-blue-600 font-medium hover:text-blue-700 transition text-sm">
                      Learn More →
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* VALUES CAROUSEL */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Guided by Our Values</h2>
            <p className="mt-2 text-gray-500">The principles that drive us every day</p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-12"
          >
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <SwiperSlide key={idx}>
                  <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition border border-gray-100">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">{val.title}</h3>
                    <p className="mt-2 text-gray-500 text-sm">{val.desc}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* TEAM CAROUSEL */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">The People Behind SkyRoute</h2>
            <p className="mt-2 text-gray-500">Meet our passionate team of travel experts</p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-12"
          >
            {team.map((member, idx) => {
              const initials = member.name.split(' ').map(w => w[0]).join('').toUpperCase();
              return (
                <SwiperSlide key={idx}>
                  <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition border border-gray-100">
                    <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
                      {initials}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                    <p className="mt-2 text-gray-500 text-sm max-w-xs mx-auto">{member.intro}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* TESTIMONIALS – STATIC GRID (no slide) */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Travelers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <Quote className="w-8 h-8 text-blue-300 mx-auto" />
                <p className="mt-4 text-gray-700 text-lg italic">"{t.review}"</p>
                <div className="mt-4 flex justify-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <h4 className="mt-2 font-semibold text-gray-800">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready for Your Next Adventure?</h2>
          <p className="mt-3 text-blue-100">Let us help you plan the perfect trip. Book your dream vacation with SkyRoute today!</p>
          <button onClick={() => navigate('/booking')} className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-xl transition hover:scale-105">
            Book Your Trip Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
