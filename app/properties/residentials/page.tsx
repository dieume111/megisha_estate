'use client';

import { MapPin, Bed, Bath, Share2, Maximize } from 'lucide-react';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import Image from 'next/image';
import { memo } from 'react';
=======
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
>>>>>>> 035045bcfef7c038601f556dd848c744706144b8

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
}

<<<<<<< HEAD
function ResidentialsPage() {
=======
const residentialImages = [
  '/images/residentials/WhatsApp Image 2026-03-08 at 16.37.59.jpeg',
  '/images/residentials/WhatsApp Image 2026-03-08 at 16.38.00.jpeg',
  '/images/residentials/WhatsApp Image 2026-03-08 at 16.38.00 (1).jpeg',
  '/images/residentials/WhatsApp Image 2026-03-08 at 16.38.00 (2).jpeg',
  '/images/residentials/WhatsApp Image 2026-03-08 at 16.38.00 (3).jpeg',
  '/images/residentials/WhatsApp Image 2026-03-08 at 16.38.01.jpeg',
  '/images/residentials/WhatsApp Image 2026-03-08 at 16.38.01 (1).jpeg',
  '/images/residentials/WhatsApp Image 2026-03-08 at 16.38.01 (2).jpeg',
  '/images/residentials/WhatsApp Image 2026-03-08 at 16.38.01 (3).jpeg',
];

export default function ResidentialsPage() {
>>>>>>> 035045bcfef7c038601f556dd848c744706144b8
  const [residentials, setResidentials] = useState<Residential[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResidentials();
  }, []);

  const fetchResidentials = async () => {
    try {
      const response = await fetch('/api/residentials');
      const data = await response.json();
      
      if (data && data.length > 0) {
        const withImages = data.map((item: Residential, index: number) => ({
          ...item,
          image_url: residentialImages[index % residentialImages.length]
        }));
        setResidentials(withImages);
      } else {
        setResidentials([]);
      }
    } catch (err) {
      setResidentials([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: currency === 'RWF' ? 'RWF' : 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C41E3A]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96">
        <div className="absolute inset-0">
<<<<<<< HEAD
          <Image
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Residential Properties"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
=======
          <img src={residentialImages[0]} alt="Residential" className="w-full h-full object-cover" />
>>>>>>> 035045bcfef7c038601f556dd848c744706144b8
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">
              Residential <span className="block text-[#C41E3A]">Properties</span>
            </h1>
            <p className="text-xl">Find your perfect home from our curated selection</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Properties</h2>
            <p className="text-xl text-gray-600">Discover our carefully selected homes</p>
          </div>

<<<<<<< HEAD
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
                    <Image
                      src={residential.image_url}
                      alt={residential.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
=======
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentials.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={property.image_url} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="33vw" />
                  <div className="absolute top-3 right-3 bg-[#C41E3A] text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1 text-[#C41E3A]" />
                    <span className="text-sm">{property.location}</span>
>>>>>>> 035045bcfef7c038601f556dd848c744706144b8
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-600 mb-3">
                    <div className="flex items-center"><Bed className="w-4 h-4 mr-1 text-[#C41E3A]" /><span className="text-sm">{property.beds}</span></div>
                    <div className="flex items-center"><Bath className="w-4 h-4 mr-1 text-[#C41E3A]" /><span className="text-sm">{property.baths}</span></div>
                    <div className="flex items-center"><Maximize className="w-4 h-4 mr-1 text-[#C41E3A]" /><span className="text-sm">{property.area}</span></div>
                  </div>
                  
                  <div className="text-xl font-bold text-[#C41E3A] mb-3">{formatPrice(property.price, property.currency)}</div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#C41E3A] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#8B0000] transition-colors flex items-center justify-center">
                      <FaWhatsapp className="w-4 h-4 mr-1" />WhatsApp
                    </button>
                    <button className="p-2 border-2 border-[#C41E3A] text-[#C41E3A] rounded-lg hover:bg-[#C41E3A] hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button className="w-full mt-2 border-2 border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:border-[#C41E3A] hover:text-[#C41E3A] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(ResidentialsPage);
