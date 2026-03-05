'use client';

import { motion } from 'framer-motion';
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
  Globe,
  Compass,
  Ruler,
  Store
} from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { memo } from 'react';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-e6296ab3f027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Home Interior Design"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{ objectPosition: 'center' }}
          />
          {/* Dark Overlay for text readability - optimized for home interior */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/25"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">
                Dream Property
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover exceptional real estate opportunities across Rwanda with Megisha Estate - your trusted partner in property investment and management
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <FaWhatsapp className="w-6 h-6" />
                <span>Get Started</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300"
              >
                Browse Properties
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Megisha Estate
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine local expertise with global standards to deliver exceptional real estate services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Guidance",
                desc: "Professional real estate experts guiding you through every step of your property journey",
                icon: Users,
                color: "text-blue-600"
              },
              {
                title: "Verified Properties",
                desc: "All properties thoroughly verified and documented for your peace of mind",
                icon: Shield,
                color: "text-green-600"
              },
              {
                title: "Best Prices",
                desc: "Competitive pricing and transparent transactions with no hidden fees",
                icon: DollarSign,
                color: "text-yellow-600"
              },
              {
                title: "Quick Transactions",
                desc: "Streamlined processes ensuring fast and efficient property transactions",
                icon: Zap,
                color: "text-purple-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our handpicked selection of premium properties across Rwanda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Villa in Kigali",
                location: "Kigali Heights",
                price: "RWF 45,000,000",
                bedrooms: 4,
                bathrooms: 3,
                area: "350 sqm",
                image: "https://images.unsplash.com/photo-1600585154340-e6296ab3f027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                featured: true
              },
              {
                title: "Commercial Space Downtown",
                location: "Kigali CBD",
                price: "RWF 25,000,000",
                bedrooms: 0,
                bathrooms: 2,
                area: "200 sqm",
                image: "https://images.unsplash.com/photo-1497366216548-375f7083bf29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                featured: false
              },
              {
                title: "Luxury Apartment",
                location: "Nyarutarama",
                price: "RWF 35,000,000",
                bedrooms: 3,
                bathrooms: 2,
                area: "180 sqm",
                image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                featured: true
              }
            ].map((property, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-48">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {property.featured && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-2">📍</span>
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {property.bedrooms > 0 && (
                        <span className="flex items-center">
                          <span className="mr-1">🛏️</span>
                          {property.bedrooms} beds
                        </span>
                      )}
                      {property.bathrooms > 0 && (
                        <span className="flex items-center">
                          <span className="mr-1">🚿</span>
                          {property.bathrooms} baths
                        </span>
                      )}
                      <span className="flex items-center">
                        <span className="mr-1">📐</span>
                        {property.area}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Property Sales",
                desc: "Buy and sell residential, commercial, and land properties with confidence",
                icon: DollarSign,
                color: "text-blue-600"
              },
              {
                title: "Property Management",
                desc: "Professional management services for your investment properties",
                icon: Shield,
                color: "text-green-600"
              },
              {
                title: "Investment Advisory",
                desc: "Expert guidance on real estate investment opportunities in Rwanda",
                icon: TrendingUp,
                color: "text-purple-600"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by hundreds of satisfied clients across Rwanda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jean Mugisha",
                role: "Property Investor",
                content: "Megisha Estate helped me find the perfect investment property. Their professionalism and market knowledge are unmatched.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              },
              {
                name: "Grace Uwimana",
                role: "Homeowner",
                content: "From search to closing, the team made my first home buying experience smooth and stress-free.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108755-2616b612c7a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              },
              {
                name: "Patrick Niyonzima",
                role: "Commercial Client",
                content: "Excellent service and deep understanding of commercial real estate needs. Highly recommended!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Properties Sold",
                value: "500+",
                desc: "Happy clients with their dream properties",
                icon: CheckCircle,
                color: "text-blue-600"
              },
              {
                title: "Years Experience",
                value: "15+",
                desc: "Combined experience in real estate",
                icon: Award,
                color: "text-green-600"
              },
              {
                title: "Client Satisfaction",
                value: "98%",
                desc: "Client satisfaction rate",
                icon: Heart,
                color: "text-red-600"
              },
              {
                title: "Properties Available",
                value: "200+",
                desc: "Current properties in portfolio",
                icon: Users,
                color: "text-purple-600"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{stat.title}</h4>
                <p className="text-gray-600">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Real Estate Background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/90"></div>
        </div>
        
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"
        />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Dream Property?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Let our expert team help you discover the perfect home or investment opportunity
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <FaWhatsapp className="w-6 h-6" />
            <span>Start Your Journey</span>
          </motion.button>
        </div>
      </motion.section>

    </div>
  );
}

export default memo(HomePage);
