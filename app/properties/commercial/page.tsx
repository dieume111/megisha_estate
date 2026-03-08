'use client';

import { MapPin, Share2, Maximize, Building } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const commercialImages = [
  '/images/commercial/WhatsApp Image 2026-03-08 at 16.33.42.jpeg',
  '/images/commercial/WhatsApp Image 2026-03-08 at 16.33.42 (1).jpeg',
  '/images/commercial/WhatsApp Image 2026-03-08 at 16.33.42 (2).jpeg',
  '/images/commercial/WhatsApp Image 2026-03-08 at 16.33.43.jpeg',
];

export default function CommercialPage() {
  const [commercials, setCommercials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/commercial').then(r => r.json()).then(data => {
      if (data && data.length > 0) {
        setCommercials(data.map((item: any, i: number) => ({ ...item, image_url: commercialImages[i % commercialImages.length] })));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const formatPrice = (price: number) => new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF', minimumFractionDigits: 0 }).format(price);

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C41E3A]"></div></div>;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img src={commercialImages[0]} alt="Commercial" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Commercial <span className="block text-[#C41E3A]">Properties</span></h1>
            <p className="text-xl">Premium commercial properties for business investments</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Commercial Properties</h2>
            <p className="text-xl text-gray-600">Discover our commercial property portfolio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercials.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={property.image_url} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="33vw" />
                  <div className="absolute top-3 right-3 bg-[#C41E3A] text-white px-2 py-1 rounded-full text-xs font-semibold">Featured</div>
                  <div className="absolute bottom-3 left-3 bg-[#C41E3A] text-white px-2 py-1 rounded-lg text-xs font-semibold">{property.type}</div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1 text-[#C41E3A]" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600 mb-3">
                    <div className="flex items-center"><Maximize className="w-4 h-4 mr-1 text-[#C41E3A]" /><span className="text-sm">{property.area}</span></div>
                  </div>
                  <div className="text-xl font-bold text-[#C41E3A] mb-3">{formatPrice(property.price)}</div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#C41E3A] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#8B0000] transition-colors flex items-center justify-center">
                      <FaWhatsapp className="w-4 h-4 mr-1" />WhatsApp
                    </button>
                    <button className="p-2 border-2 border-[#C41E3A] text-[#C41E3A] rounded-lg hover:bg-[#C41E3A] hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="w-full mt-2 border-2 border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:border-[#C41E3A] hover:text-[#C41E3A] transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
