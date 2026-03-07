'use client';

import { motion } from 'framer-motion';
import { MapPin, Home, DollarSign, Tag, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { memo } from 'react';

interface Plot {
  id: number;
  title: string;
  description: string;
  size: string;
  price: number;
  currency: string;
  use_type: 'commercial' | 'residential' | 'industrial' | 'agricultural';
  location: string;
  image_url: string;
  featured: boolean;
  status: 'available' | 'sold' | 'pending';
  created_at: string;
  updated_at: string;
}

function PlotsPage() {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/plots');
      
      if (!response.ok) {
        throw new Error('Failed to fetch plots');
      }
      
      const data = await response.json();
      setPlots(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching plots:', err);
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

  const getUseTypeColor = (useType: string) => {
    switch (useType) {
      case 'commercial':
        return 'from-orange-500 to-red-600';
      case 'residential':
        return 'from-blue-500 to-indigo-600';
      case 'industrial':
        return 'from-gray-500 to-gray-700';
      case 'agricultural':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'sold':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading plots...</p>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Plots</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchPlots}
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
          <Image
            src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Land Plots"
            fill
            className="object-cover"
            sizes="100vw"
            priority
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
              Land
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-400">
                Plots
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Premium land plots for commercial, residential, and agricultural development across Rwanda
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plots Grid Section */}
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
              Available Land Plots
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully selected land plots perfect for your development needs
            </p>
          </motion.div>

          {plots.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Plots Available</h3>
              <p className="text-gray-600">Check back later for new land plot listings</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plots.map((plot, index) => (
                <motion.div
                  key={plot.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-56">
                    <Image
                      src={plot.image_url}
                      alt={plot.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Featured Badge */}
                    {plot.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(plot.status)}`}>
                        {plot.status.charAt(0).toUpperCase() + plot.status.slice(1)}
                      </span>
                    </div>
                    
                    {/* Use Type Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className={`bg-gradient-to-r ${getUseTypeColor(plot.use_type)} text-white px-3 py-1 rounded-lg text-sm font-medium`}>
                        {plot.use_type.charAt(0).toUpperCase() + plot.use_type.slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plot.title}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      <span>{plot.location}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{plot.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Home className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm text-gray-600">{plot.size}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {formatPrice(plot.price, plot.currency)}
                        </div>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                      disabled={plot.status !== 'available'}
                    >
                      {plot.status === 'available' ? 'View Details' : 
                       plot.status === 'sold' ? 'Sold' : 'Pending'}
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

export default memo(PlotsPage);
