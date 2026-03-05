'use client';

import { motion } from 'framer-motion';
import { Home, MapPin, Bed, Bath, Square, DollarSign, Car, Trees, Shield } from 'lucide-react';

export default function VillaPage() {
  const villas = [
    {
      id: 1,
      title: "Luxury Pool Villa",
      location: "Kigali, Nyarutarama",
      beds: 6,
      baths: 5,
      area: "500 sqm",
      price: "RWF 120,000,000",
      featured: true,
      amenities: ["Private Pool", "Garden", "Garage", "Security"],
      description: "Ultra-luxury villa with private pool and stunning views"
    },
    {
      id: 2,
      title: "Modern Executive Villa",
      location: "Kigali, Kimihurura",
      beds: 5,
      baths: 4,
      area: "450 sqm",
      price: "RWF 95,000,000",
      amenities: ["Garden", "Garage", "Security"],
      description: "Executive villa perfect for families"
    },
    {
      id: 3,
      title: "Garden Villa Estate",
      location: "Kigali, Kacyiru",
      beds: 4,
      baths: 3,
      area: "380 sqm",
      price: "RWF 75,000,000",
      amenities: ["Large Garden", "Garage"],
      description: "Beautiful villa with expansive garden"
    },
    {
      id: 4,
      title: "Contemporary Villa",
      location: "Kigali, Remera",
      beds: 5,
      baths: 4,
      area: "420 sqm",
      price: "RWF 85,000,000",
      amenities: ["Modern Design", "Garage", "Security"],
      description: "Contemporary design with modern amenities"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Villas"
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
              Luxury
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                Villas
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Exclusive luxury villas offering premium living experiences in Rwanda's most prestigious locations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Villas Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas.map((villa, index) => (
              <motion.div
                key={villa.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                  <Home className="w-16 h-16 text-white" />
                </div>
                
                <div className="p-6">
                  {villa.featured && (
                    <div className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold mb-3">
                      Featured
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{villa.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                    <span>{villa.location}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{villa.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold text-purple-600">{villa.price}</p>
                  </div>
                  
                  <div className="flex space-x-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {villa.beds} Beds
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {villa.baths} Baths
                    </span>
                    <span className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {villa.area}
                    </span>
                  </div>
                  
                  {/* Amenities */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {villa.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
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
