'use client';

import { MapPin, Share2, Maximize } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

interface Plot {
  id: number;
  title: string;
  description: string;
  size: string;
  price: number;
  currency: string;
  use_type: string;
  location: string;
  image_url: string;
  featured: boolean;
  status: string;
}

const plotImages = [
  '/images/plots/apm.jpeg',
  '/images/plots/kan.jpeg',
  '/images/plots/WhatsApp Image 2026-02-16 at 2.35.06 PM.jpeg',
];

export default function PlotsPage() {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      const response = await fetch('/api/plots');
      const data = await response.json();
      
      if (data && data.length > 0) {
        const withImages = data.map((item: Plot, index: number) => ({
          ...item,
          image_url: plotImages[index % plotImages.length]
        }));
        setPlots(withImages);
      } else {
        setPlots([]);
      }
    } catch (err) {
      setPlots([]);
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
          <img src={plotImages[0]} alt="Plots" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">
              Land <span className="block text-[#C41E3A]">Plots</span>
            </h1>
            <p className="text-xl">Premium land plots for development across Rwanda</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Land Plots</h2>
            <p className="text-xl text-gray-600">Discover our carefully selected land plots</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plots.map((plot) => (
              <div key={plot.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={plot.image_url} alt={plot.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="33vw" />
                  <div className="absolute top-3 right-3 bg-[#C41E3A] text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#C41E3A] text-white px-2 py-1 rounded-lg text-xs font-semibold capitalize">
                    {plot.use_type}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{plot.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1 text-[#C41E3A]" />
                    <span className="text-sm">{plot.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-600 mb-3">
                    <div className="flex items-center"><Maximize className="w-4 h-4 mr-1 text-[#C41E3A]" /><span className="text-sm">{plot.size}</span></div>
                  </div>
                  
                  <div className="text-xl font-bold text-[#C41E3A] mb-3">{formatPrice(plot.price, plot.currency)}</div>
                  
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
