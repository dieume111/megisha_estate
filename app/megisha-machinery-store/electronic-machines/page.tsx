'use client';

import { motion } from 'framer-motion';
import { Wrench, Zap, Settings, Cpu, Package, Shield, Award, Clock, Users, Power, Monitor, Printer } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';

function ElectronicMachinesPage() {
  const machines = [
    {
      title: "Industrial Power Tools",
      description: "Heavy-duty power tools for construction and industrial applications",
      icon: Zap,
      features: ["High Performance", "Durable Design", "Safety Certified", "Energy Efficient"],
      price: "From RWF 150,000",
      category: "Power Tools"
    },
    {
      title: "Electronic Testing Equipment",
      description: "Precision testing and measurement devices for electrical systems",
      icon: Settings,
      features: ["Digital Display", "High Accuracy", "Portable Design", "Multi-function"],
      price: "From RWF 200,000",
      category: "Testing Equipment"
    },
    {
      title: "Computing Systems",
      description: "Professional computers and workstations for business operations",
      icon: Monitor,
      features: ["High Performance", "Business Grade", "Warranty Included", "Technical Support"],
      price: "From RWF 450,000",
      category: "Computers"
    },
    {
      title: "Office Electronics",
      description: "Complete range of electronic equipment for modern offices",
      icon: Printer,
      features: ["Network Ready", "Multi-function", "Energy Saving", "Compact Design"],
      price: "From RWF 180,000",
      category: "Office Equipment"
    }
  ];

  const featuredProducts = [
    {
      name: "Industrial Drill Machine",
      type: "Power Tool",
      brand: "Bosch Professional",
      price: "RWF 285,000",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Heavy-duty industrial drill for construction and manufacturing"
    },
    {
      name: "Digital Multimeter",
      type: "Testing Equipment",
      brand: "Fluke",
      price: "RWF 125,000",
      image: "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Professional digital multimeter for electrical testing"
    },
    {
      name: "Business Laptop",
      type: "Computer",
      brand: "Dell Latitude",
      price: "RWF 520,000",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "High-performance laptop for business and professional use"
    }
  ];

  const services = [
    { title: "Technical Support", description: "24/7 technical assistance and troubleshooting", icon: Cpu },
    { title: "Maintenance Service", description: "Regular maintenance and repair services", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Electronic Machines"
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
              Electronic
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">
                Machines
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Premium electronic machines and equipment for industrial, commercial, and office use in Rwanda
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {machines.map((machine, index) => (
              <motion.div
                key={machine.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <machine.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{machine.title}</h3>
                <p className="text-gray-600 mb-4">{machine.description}</p>
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                    {machine.category}
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {machine.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-lg font-bold text-blue-600">{machine.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(ElectronicMachinesPage);
