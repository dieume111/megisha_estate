'use client';

import { motion } from 'framer-motion';
import { MapPin, Home, DollarSign, Tag, CheckCircle, Bed, Bath } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Residential {
  id: number;
  title: string;
  description: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  price: number;
  currency: string;
  image_url: string;
  featured: boolean;
  status: 'available' | 'sold' | 'pending';
  amenities: string[];
  created_at: string;
  updated_at: string;
}

export default function ResidentialsPage() {
  const [residentials, setResidentials] = useState<Residential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResidentials();
  }, []);

  const fetchResidentials = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/residentials');
      
      if (!response.ok) {
        throw new Error('Failed to fetch residentials');
      }
      
      const data = await response.json();
      setResidentials(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching residentials:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: currency === 'RWF' ? 'RWF' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading residential properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Residentials</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchResidentials}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Residential Properties"
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
              Residential
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">
                Properties
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Find your perfect home from our curated selection of residential properties across Rwanda
            </p>
          </motion.div>
        </div>
      </section>

      {/* Residentials Grid Section */}
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
              Available Residential Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully selected homes designed for comfortable living
            </p>
          </motion.div>

          {residentials.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Residential Properties Available</h3>
              <p className="text-gray-600">Check back later for new residential listings</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {residentials.map((residential, index) => (
                <motion.div
                  key={residential.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-56">
                    <img
                      src={residential.image_url}
                      alt={residential.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Featured Badge */}
                    {residential.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4">
                      {/* Status Badge */}
                      <span className={
                        "px-3 py-1 rounded-full text-sm font-medium " +
                        (residential.status === 'available' ? 'bg-green-100 text-green-700' :
                         residential.status === 'sold' ? 'bg-red-100 text-red-700' :
                         'bg-yellow-100 text-yellow-700')
                      }>
                        {residential.status.charAt(0).toUpperCase() + residential.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{residential.title}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{residential.location}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{residential.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1 text-purple-500" />
                          <span className="text-sm text-gray-600">{residential.beds}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1 text-cyan-500" />
                          <span className="text-sm text-gray-600">{residential.baths}</span>
                        </div>
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-2 text-green-500" />
                          <span className="text-sm text-gray-600">{residential.area}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {formatPrice(residential.price, residential.currency)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Amenities */}
                    {residential.amenities && residential.amenities.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {residential.amenities.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {amenity}
                            </span>
                          ))}
                          {residential.amenities.length > 3 && (
                            <span className="text-gray-500 text-xs">+{residential.amenities.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                      disabled={residential.status !== 'available'}
                    >
                      {residential.status === 'available' ? 'View Details' : 
                       residential.status === 'sold' ? 'Sold' : 'Pending'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
