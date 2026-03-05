'use client';

import { motion } from 'framer-motion';
import { Car, DollarSign, Fuel, Gauge, Calendar, MapPin, Shield, Award, Clock, Users, CheckCircle, Star } from 'lucide-react';

export default function CarDealsForSellPage() {
  const featuredCars = [
    {
      name: "Toyota Land Cruiser",
      year: "2022",
      type: "SUV",
      price: "RWF 35,000,000",
      mileage: "45,000 km",
      fuel: "Diesel",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1550355241-5a5b94d5c1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["4WD", "Leather Seats", "Navigation", "Cruise Control"],
      condition: "Excellent",
      location: "Kigali"
    },
    {
      name: "Toyota Corolla",
      year: "2021",
      type: "Sedan",
      price: "RWF 18,000,000",
      mileage: "28,000 km",
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["Air Conditioning", "Power Windows", "ABS", "Airbags"],
      condition: "Excellent",
      location: "Kigali"
    },
    {
      name: "Toyota Hilux",
      year: "2023",
      type: "Pickup",
      price: "RWF 28,000,000",
      mileage: "15,000 km",
      fuel: "Diesel",
      transmission: "Manual",
      image: "https://images.unsplash.com/photo-1606664535534-cf12d90704c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["4WD", "Towing Capacity", "Heavy Duty", "Canopy"],
      condition: "Like New",
      location: "Kigali"
    },
    {
      name: "Honda CR-V",
      year: "2022",
      type: "SUV",
      price: "RWF 22,000,000",
      mileage: "32,000 km",
      fuel: "Petrol",
      transmission: "CVT",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["AWD", "Sunroof", "Leather Seats", "Backup Camera"],
      condition: "Excellent",
      location: "Kigali"
    },
    {
      name: "Nissan Patrol",
      year: "2021",
      type: "SUV",
      price: "RWF 32,000,000",
      mileage: "52,000 km",
      fuel: "Diesel",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1549394780-6e263903e0c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["4WD", "7 Seats", "Off-road", "Premium Audio"],
      condition: "Good",
      location: "Kigali"
    },
    {
      name: "Mitsubishi Pajero",
      year: "2020",
      type: "SUV",
      price: "RWF 25,000,000",
      mileage: "68,000 km",
      fuel: "Diesel",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["4WD", "Super Select", "Premium Interior", "Towing"],
      condition: "Good",
      location: "Kigali"
    }
  ];

  const services = [
    { title: "Vehicle Inspection", description: "Comprehensive pre-sale inspection and certification", icon: CheckCircle },
    { title: "Financing Options", description: "Flexible financing solutions for all car purchases", icon: DollarSign },
    { title: "Insurance Support", description: "Complete insurance assistance and documentation", icon: Shield },
    { title: "After Sales Service", description: "Ongoing maintenance and support services", icon: Award }
  ];

  const benefits = [
    "Quality Certified Vehicles",
    "Competitive Pricing",
    "Transparent Documentation",
    "Warranty Available",
    "Trade-in Options",
    "Home Delivery Available"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1493238794027-772698d84e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Cars for Sale"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cars for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-400">
                Sale
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Quality used and new cars for sale in Rwanda with competitive prices and excellent service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Cars for Sale
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium quality vehicles with full documentation and warranty
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-48 relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {car.condition}
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {car.year}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-green-600 mb-3">{car.price}</div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Gauge className="w-4 h-4 mr-2 text-blue-500" />
                      {car.mileage}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Fuel className="w-4 h-4 mr-2 text-blue-500" />
                      {car.fuel}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Car className="w-4 h-4 mr-2 text-blue-500" />
                      {car.transmission}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      {car.location}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Sales Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete support services for your car purchase
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Cars
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Benefits of purchasing your car from Megisha Machinery Store
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Dream Car?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Browse our extensive collection of quality cars and drive home your perfect vehicle today
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              View All Cars
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
