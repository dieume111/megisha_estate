'use client';

import { MapPin, Mountain, Layers, Droplets, Trees } from 'lucide-react';
import Image from 'next/image';

const topographicImages = [
  '/images/topographic survey/WhatsApp Image 2026-03-08 at 17.47.01.jpeg',
  '/images/topographic survey/WhatsApp Image 2026-03-08 at 17.47.02.jpeg',
  '/images/topographic survey/WhatsApp Image 2026-03-08 at 17.47.02 (1).jpeg',
  '/images/topographic survey/WhatsApp Image 2026-03-08 at 17.47.02 (2).jpeg',
  '/images/topographic survey/WhatsApp Image 2026-03-08 at 17.47.03.jpeg',
  '/images/topographic survey/WhatsApp Image 2026-03-08 at 17.47.03 (1).jpeg',
];

export default function TopographicSurveyingPage() {
  const services = [
    { title: "Contour Mapping", description: "Detailed mapping of land elevation and contour lines", icon: Mountain, features: ["Elevation Survey", "Contour Lines", "Spot Heights", "Cross Sections"] },
    { title: "Digital Terrain Modeling", description: "Creating 3D digital models of terrain surfaces", icon: Layers, features: ["3D Modeling", "Surface Analysis", "Volume Calculation", "Visualization"] },
    { title: "Hydrographic Survey", description: "Surveying of water bodies and drainage patterns", icon: Droplets, features: ["Water Body Mapping", "Drainage Analysis", "Flood Assessment", "Water Flow Studies"] },
    { title: "Vegetation Mapping", description: "Mapping and analysis of vegetation cover", icon: Trees, features: ["Tree Survey", "Vegetation Classification", "Cover Analysis", "Environmental Assessment"] },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img src={topographicImages[0]} alt="Topographic Surveying" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Topographic <span className="block text-[#C41E3A]">Surveying</span></h1>
            <p className="text-xl">Professional topographic surveying for land mapping and terrain analysis</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Topographic Survey Services</h2>
            <p className="text-xl text-gray-600">Comprehensive topographic surveying solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="w-16 h-16 bg-[#C41E3A] rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-[#C41E3A] rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Topographic Projects</h2>
            <p className="text-xl text-gray-600">Successfully completed topographic surveying projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topographicImages.slice(1).map((img, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={img} alt={`Project ${index + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="33vw" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Topographic Project {index + 1}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-[#C41E3A]" />
                    <span className="text-sm">Rwanda</span>
                  </div>
                  <span className="inline-block bg-[#FFF5F5] text-[#C41E3A] px-2 py-1 rounded-lg text-xs font-semibold">Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
