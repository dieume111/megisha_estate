'use client';

import { MapPin, Bed, Bath, Share2, Maximize } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#771D1D]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img src={residentialImages[0]} alt="Residential" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">
              Residential <span className="block text-[#771D1D]">Properties</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentials.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={property.image_url} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="33vw" />
                  <div className="absolute top-3 right-3 bg-[#771D1D] text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1 text-[#771D1D]" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-600 mb-3">
                    <div className="flex items-center"><Bed className="w-4 h-4 mr-1 text-[#771D1D]" /><span className="text-sm">{property.beds}</span></div>
                    <div className="flex items-center"><Bath className="w-4 h-4 mr-1 text-[#771D1D]" /><span className="text-sm">{property.baths}</span></div>
                    <div className="flex items-center"><Maximize className="w-4 h-4 mr-1 text-[#771D1D]" /><span className="text-sm">{property.area}</span></div>
                  </div>
                  
                  <div className="text-xl font-bold text-[#771D1D] mb-3">{formatPrice(property.price, property.currency)}</div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#771D1D] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#771D1D] transition-colors flex items-center justify-center">
                      <FaWhatsapp className="w-4 h-4 mr-1" />WhatsApp
                    </button>
                    <button className="p-2 border-2 border-[#771D1D] text-[#771D1D] rounded-lg hover:bg-[#771D1D] hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button className="w-full mt-2 border-2 border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:border-[#771D1D] hover:text-[#771D1D] transition-colors">
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
