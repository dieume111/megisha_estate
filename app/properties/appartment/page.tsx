'use client';

import { motion } from 'framer-motion';
import { Building, MapPin, Bed, Bath, Square, DollarSign, Car, Wifi, Shield, Elevator } from 'lucide-react';

export default function ApartmentPage() {
  const apartments = [
    {
      id: 1,
      title: "Luxury Penthouse",
      location: "Kigali, Kimihurura",
      beds: 3,
      baths: 2,
      area: "180 sqm",
      price: "RWF 65,000,000",
      featured: true,
      amenities: ["Rooftop Access", "Gym", "Security", "Parking"],
      description: "Stunning penthouse with panoramic city views"
    },
    {
      id: 2,
      title: "Modern 2-Bedroom",
      location: "Kigali, Kacyiru",
      beds: 2,
      baths: 1,
      area: "120 sqm",
      price: "RWF 35,000,000",
      amenities: ["Security", "Parking", "Elevator"],
      description: "Modern apartment perfect for couples"
    },
    {
      id: 3,
      title: "Studio Apartment",
      location: "Kigali, Nyarutarama",
      beds: 1,
      baths: 1,
      area: "60 sqm",
      price: "RWF 18,000,000",
      amenities: ["Security", "Gym", "WiFi"],
      description: "Cozy studio ideal for singles"
    },
    {
      id: 4,
      title: "Family Apartment",
      location: "Kigali, Remera",
      beds: 4,
      baths: 2,
      area: "200 sqm",
      price: "RWF 45,000,000",
      amenities: ["Parking", "Security", "Playground", "Elevator"],
      description: "Spacious family apartment with great amenities"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Apartments"
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
              Modern
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                Apartments
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Contemporary apartments offering comfortable living with modern amenities in prime locations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apartment, index) => (
              <motion.div
                key={apartment.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-48 bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center">
                  <Building className="w-16 h-16 text-white" />
                </div>
                
                <div className="p-6">
                  {apartment.featured && (
                    <div className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold mb-3">
                      Featured
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{apartment.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                    <span>{apartment.location}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{apartment.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold text-teal-600">{apartment.price}</p>
                  </div>
                  
                  <div className="flex space-x-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {apartment.beds} Beds
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {apartment.baths} Baths
                    </span>
                    <span className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {apartment.area}
                    </span>
                  </div>
                  
                  {/* Amenities */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {apartment.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="bg-teal-100 text-teal-700 px-2 py-1 rounded-lg text-xs font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all duration-300"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
