'use client';

import { motion } from 'framer-motion';
import { MapPin, FileText, Home, Scale, Shield, Award, Clock, Users, Map } from 'lucide-react';

export default function CadastralSurveyingPage() {
  const services = [
    {
      title: "Land Registration",
      description: "Official survey and registration of land parcels with government authorities",
      icon: FileText,
      features: ["Boundary Marking", "Legal Documentation", "Government Filing", "Title Processing"]
    },
    {
      title: "Property Boundary Survey",
      description: "Precise measurement and marking of property boundaries",
      icon: MapPin,
      features: ["GPS Surveying", "Boundary Markers", "Coordinate Mapping", "Dispute Resolution"]
    },
    {
      title: "Land Title Processing",
      description: "Complete assistance with land title acquisition and transfers",
      icon: Home,
      features: ["Title Search", "Transfer Processing", "Registration", "Certificate Issuance"]
    },
    {
      title: "Property Valuation",
      description: "Professional property valuation for various purposes",
      icon: Scale,
      features: ["Market Analysis", "Property Assessment", "Valuation Reports", "Investment Advice"]
    }
  ];

  const projects = [
    {
      name: "Residential Land Registration - Kigali",
      location: "Kacyiru, Kigali",
      type: "Residential",
      area: "500 sqm",
      status: "Completed",
      description: "Complete cadastral survey and land registration for residential property"
    },
    {
      name: "Commercial Property Survey - Nyarutarama",
      location: "Nyarutarama, Kigali",
      type: "Commercial", 
      area: "1200 sqm",
      status: "Completed",
      description: "Boundary survey and title processing for commercial development"
    },
    {
      name: "Agricultural Land Mapping - Eastern Province",
      location: "Kayonza, Rwanda",
      type: "Agricultural",
      area: "5 hectares",
      status: "In Progress",
      description: "Large-scale agricultural land boundary survey and registration"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Cadastral Surveying"
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
              Cadastral
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">
                Surveying
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Professional cadastral surveying services for land registration, boundary marking, and property title processing in Rwanda
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
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
              Our Cadastral Survey Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete cadastral surveying solutions for property registration and boundary determination
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Cadastral Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Successfully completed cadastral surveying projects across Rwanda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <Map className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm font-medium">
                      {project.type}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-sm font-medium">
                      {project.area}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Cadastral Survey Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic approach to cadastral surveying from initial consultation to final registration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Initial Consultation", desc: "Understanding client requirements and property details" },
              { step: "2", title: "Field Survey", desc: "On-site measurement and boundary marking" },
              { step: "3", title: "Documentation", desc: "Preparing survey reports and legal documents" },
              { step: "4", title: "Registration", desc: "Submitting to authorities and obtaining title" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
