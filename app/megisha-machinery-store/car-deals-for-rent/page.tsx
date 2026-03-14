'use client';

import { motion } from 'framer-motion';
import { Car, Calendar, DollarSign, Fuel, Gauge, MapPin, Shield, Award, Clock, Users, CheckCircle, Star, Key } from 'lucide-react';

export default function CarDealsForRentPage() {
  const rentalCars = [
    {
      name: "Toyota Corolla",
      year: "2022",
      type: "Sedan",
      dailyRate: "RWF 45,000",
      weeklyRate: "RWF 280,000",
      monthlyRate: "RWF 950,000",
      seats: 5,
      fuel: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1550355241-5a5b94d5c1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["Air Conditioning", "GPS", "Bluetooth", "USB Charging"],
      category: "Economy",
      available: true
    },
    {
      name: "Toyota RAV4",
      year: "2023",
      type: "SUV",
      dailyRate: "RWF 65,000",
      weeklyRate: "RWF 420,000",
      monthlyRate: "RWF 1,450,000",
      seats: 5,
      fuel: "Hybrid",
      transmission: "CVT",
      image: "https://images.unsplash.com/photo-1606664535534-cf12d90704c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["AWD", "Sunroof", "Leather Seats", "Backup Camera"],
      category: "SUV",
      available: true
    },
    {
      name: "Toyota Hiace",
      year: "2022",
      type: "Van",
      dailyRate: "RWF 85,000",
      weeklyRate: "RWF 550,000",
      monthlyRate: "RWF 1,900,000",
      seats: 12,
      fuel: "Diesel",
      transmission: "Manual",
      image: "https://images.unsplash.com/photo-1549394780-6e263903e0c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["AC", "Large Cargo Space", "Power Steering", "Audio System"],
      category: "Van",
      available: true
    },
    {
      name: "Honda CR-V",
      year: "2023",
      type: "SUV",
      dailyRate: "RWF 70,000",
      weeklyRate: "RWF 450,000",
      monthlyRate: "RWF 1,550,000",
      seats: 5,
      fuel: "Petrol",
      transmission: "CVT",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["AWD", "Cruise Control", "Lane Assist", "Apple CarPlay"],
      category: "SUV",
      available: true
    },
    {
      name: "Toyota Land Cruiser",
      year: "2022",
      type: "SUV",
      dailyRate: "RWF 120,000",
      weeklyRate: "RWF 780,000",
      monthlyRate: "RWF 2,700,000",
      seats: 7,
      fuel: "Diesel",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["4WD", "Premium Audio", "Navigation", "Leather Interior"],
      category: "Luxury",
      available: true
    },
    {
      name: "Nissan Patrol",
      year: "2021",
      type: "SUV",
      dailyRate: "RWF 110,000",
      weeklyRate: "RWF 720,000",
      monthlyRate: "RWF 2,500,000",
      seats: 7,
      fuel: "Diesel",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["4WD", "Off-road", "Premium Interior", "Towing Capacity"],
      category: "Luxury",
      available: false
    }
  ];

  const services = [
    { title: "Flexible Rental Periods", description: "Daily, weekly, and monthly rental options", icon: Calendar },
    { title: "Insurance Included", description: "Comprehensive insurance coverage for all rentals", icon: Shield },
    { title: "24/7 Roadside Assistance", description: "Emergency support available anytime", icon: Award },
    { title: "Delivery & Pickup", description: "Door-to-door delivery and pickup service", icon: Car }
  ];

  const rentalProcess = [
    { step: "1", title: "Choose Your Car", description: "Browse our fleet and select your preferred vehicle" },
    { step: "2", title: "Book Online", description: "Reserve your car with easy online booking" },
    { step: "3", title: "Pick Up", description: "Collect your car or request delivery" },
    { step: "4", title: "Drive & Return", description: "Enjoy your rental and return when done" }
  ];

  const benefits = [
    "Well-Maintained Fleet",
    "Competitive Rates",
    "No Hidden Charges",
    "Flexible Terms",
    "Professional Service",
    "Multiple Locations"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Car Rental"
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
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">
                Rent
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Quality car rental services in Rwanda with flexible terms and competitive rates
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rental Cars Section */}
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
              Available Rental Cars
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our well-maintained fleet of quality vehicles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentalCars.map((car, index) => (
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
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-sm font-medium ${
                    car.available 
                      ? 'bg-green-600 text-white' 
                      : 'bg-[#771D1D] text-white'
                  }`}>
                    {car.available ? 'Available' : 'Booked'}
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {car.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.7</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{car.dailyRate}</div>
                      <div className="text-xs text-gray-600">Daily</div>
                    </div>
                    <div className="bg-green-50 p-2 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{car.weeklyRate}</div>
                      <div className="text-xs text-gray-600">Weekly</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{car.monthlyRate}</div>
                      <div className="text-xs text-gray-600">Monthly</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      {car.seats} Seats
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
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {car.year}
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
                    className={`w-full py-2 rounded-lg font-medium transition-colors ${
                      car.available
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!car.available}
                  >
                    {car.available ? 'Book Now' : 'Currently Unavailable'}
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
              Our Rental Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete rental solutions with excellent support
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Process Section */}
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
              Easy Rental Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to rent your perfect car
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {rentalProcess.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why Rent From Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Benefits of choosing our car rental services
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
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Rent Your Car?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your rental car today and enjoy quality service at competitive rates
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Book Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
