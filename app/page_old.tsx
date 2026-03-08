'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Building, 
  Phone, 
  MapPin, 
  DollarSign, 
  Shield, 
  TrendingUp, 
  Heart,
  Star,
  CheckCircle,
  Users,
  Award,
  Zap,
  Search,
  Bed,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { memo, useState, useEffect } from 'react';

const slideImages = [
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.03.55 (1).jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.03.59.jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.01.jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.02.jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.04.jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.05.jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.06.jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.11.jpeg',
];

const propertyOverlays = [
  { title: 'Luxury Villa in Kigali', location: 'Nyarutarama', price: 'RWF 85,000,000', beds: 4, baths: 3, area: '450 sqm' },
  { title: 'Modern Family Home', location: 'Kacyiru', price: 'RWF 65,000,000', beds: 3, baths: 2, area: '320 sqm' },
  { title: 'Executive Residence', location: 'Kimihurura', price: 'RWF 95,000,000', beds: 5, baths: 4, area: '520 sqm' },
  { title: 'Contemporary Villa', location: 'Gisozi', price: 'RWF 72,000,000', beds: 4, baths: 3, area: '380 sqm' },
  { title: 'Elegant Estate', location: 'Kiyovu', price: 'RWF 120,000,000', beds: 6, baths: 5, area: '650 sqm' },
  { title: 'Premium Property', location: 'Rebero', price: 'RWF 78,000,000', beds: 4, baths: 3, area: '410 sqm' },
  { title: 'Spacious Villa', location: 'Kagugu', price: 'RWF 68,000,000', beds: 3, baths: 2, area: '350 sqm' },
  { title: 'Luxury Mansion', location: 'Nyarutarama', price: 'RWF 150,000,000', beds: 7, baths: 6, area: '800 sqm' },
];

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: '',
    bedrooms: '',
    status: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slideshow Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Image
              src={slideImages[currentSlide]}
              alt={`Property ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        {/* Property Overlay Card */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            key={`overlay-${currentSlide}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#8B4513]/80 backdrop-blur-sm p-8 rounded-2xl max-w-lg border-2 border-[#D2691E]/50"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {propertyOverlays[currentSlide].title}
            </h1>
            <div className="flex items-center text-[#F5E6D3] mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{propertyOverlays[currentSlide].location}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6 text-white">
              <div className="text-center">
                <Bed className="w-6 h-6 mx-auto mb-1 text-[#D2691E]" />
                <p className="text-sm">{propertyOverlays[currentSlide].beds} Beds</p>
              </div>
              <div className="text-center">
                <Home className="w-6 h-6 mx-auto mb-1 text-[#D2691E]" />
                <p className="text-sm">{propertyOverlays[currentSlide].baths} Baths</p>
              </div>
              <div className="text-center">
                <Building className="w-6 h-6 mx-auto mb-1 text-[#D2691E]" />
                <p className="text-sm">{propertyOverlays[currentSlide].area}</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-[#D2691E] mb-6">
              {propertyOverlays[currentSlide].price}
            </div>
            <button className="w-full bg-[#D2691E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A0522D] transition-colors">
              View Details
            </button>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#8B4513]/80 p-3 rounded-full hover:bg-[#6B3410] transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#8B4513]/80 p-3 rounded-full hover:bg-[#6B3410] transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slideImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? 'bg-[#D2691E] w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Search Filter Section */}
      <section className="relative -mt-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-[#8B4513]"
          >
            <h2 className="text-2xl font-bold text-[#6B3410] mb-6 flex items-center">
              <Search className="w-6 h-6 mr-2 text-[#D2691E]" />
              Find Your Dream Property
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <input
                type="text"
                placeholder="Location"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B4513] focus:outline-none"
              />
              <select
                value={searchFilters.propertyType}
                onChange={(e) => setSearchFilters({...searchFilters, propertyType: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B4513] focus:outline-none"
              >
                <option value="">Property Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="plot">Plot</option>
              </select>
              <select
                value={searchFilters.bedrooms}
                onChange={(e) => setSearchFilters({...searchFilters, bedrooms: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B4513] focus:outline-none"
              >
                <option value="">Bedrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
              <select
                value={searchFilters.status}
                onChange={(e) => setSearchFilters({...searchFilters, status: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B4513] focus:outline-none"
              >
                <option value="">Status</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <input
                type="number"
                placeholder="Min Price"
                value={searchFilters.minPrice}
                onChange={(e) => setSearchFilters({...searchFilters, minPrice: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B4513] focus:outline-none"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={searchFilters.maxPrice}
                onChange={(e) => setSearchFilters({...searchFilters, maxPrice: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B4513] focus:outline-none"
              />
            </div>
            <button className="w-full mt-4 bg-[#8B4513] text-white py-3 rounded-lg font-semibold hover:bg-[#6B3410] transition-colors flex items-center justify-center">
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F5E6D3]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#6B3410] mb-4">
              Why Choose Megisha Estate
            </h2>
            <p className="text-xl text-[#8B4513] max-w-3xl mx-auto">
              We combine local expertise with global standards to deliver exceptional real estate services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Expert Guidance", desc: "Professional real estate experts guiding you through every step", icon: Users, color: "text-[#8B4513]" },
              { title: "Verified Properties", desc: "All properties thoroughly verified and documented", icon: Shield, color: "text-[#A0522D]" },
              { title: "Best Prices", desc: "Competitive pricing and transparent transactions", icon: DollarSign, color: "text-[#D2691E]" },
              { title: "Quick Transactions", desc: "Streamlined processes ensuring fast transactions", icon: Zap, color: "text-[#6B3410]" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-[#8B4513]"
              >
                <div className="w-14 h-14 bg-[#F5E6D3] rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h4 className="text-xl font-bold text-[#6B3410] mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Properties Sold", value: "500+", icon: CheckCircle, color: "text-[#8B4513]" },
              { title: "Years Experience", value: "15+", icon: Award, color: "text-[#A0522D]" },
              { title: "Client Satisfaction", value: "98%", icon: Heart, color: "text-[#D2691E]" },
              { title: "Properties Available", value: "200+", icon: Building, color: "text-[#6B3410]" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#F5E6D3] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <h3 className="text-4xl font-bold text-[#8B4513] mb-2">{stat.value}</h3>
                <h4 className="text-lg font-semibold text-[#6B3410] mb-2">{stat.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#8B4513] to-[#6B3410] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Dream Property?
          </h3>
          <p className="text-xl text-[#F5E6D3] mb-8">
            Let our expert team help you discover the perfect home or investment opportunity
          </p>
          <button className="bg-[#D2691E] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#A0522D] transition-all inline-flex items-center space-x-2">
            <FaWhatsapp className="w-6 h-6" />
            <span>Start Your Journey</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default memo(HomePage);
