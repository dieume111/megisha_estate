'use client';

import { motion } from 'framer-motion';
import { Building, MapPin, Square, DollarSign, Users, Car, Shield, Wifi } from 'lucide-react';

export default function CommercialPage() {
  const commercials = [
    {
      id: 1,
      title: "Office Complex Downtown",
      location: "Kigali City Center",
      area: "2000 sqm",
      price: "RWF 250,000,000",
      type: "Office Space",
      featured: true,
      amenities: ["Parking", "Security", "WiFi", "Elevator"],
      description: "Prime office space in the heart of Kigali business district"
    },
    {
      id: 2,
      title: "Retail Shopping Center",
      location: "Kigali, Nyabugogo",
      area: "1500 sqm",
      price: "RWF 180,000,000",
      type: "Retail",
      amenities: ["Parking", "Security", "High Traffic"],
      description: "High-traffic retail space perfect for shopping center"
    },
    {
      id: 3,
      title: "Industrial Warehouse",
      location: "Kigali, Kicukiro",
      area: "3000 sqm",
      price: "RWF 150,000,000",
      type: "Industrial",
      amenities: ["Large Space", "Loading Dock", "Security"],
      description: "Spacious warehouse ideal for industrial operations"
    },
    {
      id: 4,
      title: "Mixed Use Building",
      location: "Kigali, Remera",
      area: "1200 sqm",
      price: "RWF 200,000,000",
      type: "Mixed Use",
      amenities: ["Retail + Office", "Parking", "Prime Location"],
      description: "Versatile mixed-use building with retail and office spaces"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Commercial Properties"
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
              Commercial
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                Properties
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Premium commercial properties for office, retail, and industrial investments across Rwanda
            </p>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commercials.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-48 bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                  <Building className="w-16 h-16 text-white" />
                </div>
                
                <div className="p-6">
                  {property.featured && (
                    <div className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold mb-3">
                      Featured
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                    <span>{property.location}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold text-orange-600">{property.price}</p>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-sm font-medium">
                      {property.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <Square className="w-4 h-4 mr-2 text-orange-500" />
                    <span>{property.area}</span>
                  </div>
                  
                  {/* Amenities */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300"
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
