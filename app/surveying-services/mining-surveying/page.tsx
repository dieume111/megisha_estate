'use client';

import { motion } from 'framer-motion';
import { Compass, MapPin, Mountain, Pickaxe, Shield, Award, Clock, Users } from 'lucide-react';
import Layout from '../../../components/Layout';

export default function MiningSurveyingPage() {
  const services = [
    {
      title: "Mineral Exploration",
      description: "Comprehensive geological surveys to identify and map mineral deposits",
      icon: Mountain,
      features: ["Geological Mapping", "Sample Collection", "Laboratory Analysis", "Resource Estimation"]
    },
    {
      title: "Mine Planning",
      description: "Strategic planning for efficient and safe mining operations",
      icon: Pickaxe,
      features: ["Site Assessment", "Safety Planning", "Environmental Impact", "Operational Design"]
    },
    {
      title: "Resource Assessment",
      description: "Detailed evaluation of mineral resources and reserves",
      icon: Compass,
      features: ["Volume Calculation", "Grade Analysis", "Economic Viability", "Market Assessment"]
    },
    {
      title: "Environmental Compliance",
      description: "Ensuring mining operations meet environmental regulations",
      icon: Shield,
      features: ["Impact Assessment", "Compliance Audits", "Reclamation Planning", "Monitoring Systems"]
    }
  ];

  const projects = [
    {
      name: "Tin Mining Project - Northern Province",
      location: "Musanze, Rwanda",
      type: "Tin & Tantalum",
      status: "Completed",
      description: "Comprehensive survey and planning for tin mining operations"
    },
    {
      name: "Gold Exploration - Eastern Province",
      location: "Kayonza, Rwanda", 
      type: "Gold Deposits",
      status: "In Progress",
      description: "Ongoing exploration and resource assessment"
    },
    {
      name: "Coltan Survey - Western Province",
      location: "Rubavu, Rwanda",
      type: "Coltan Minerals",
      status: "Planning",
      description: "Preparation for coltan mining survey operations"
    }
  ];

  return (
    <Layout currentPage="mining-surveying">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618489338014-2a9792c0d3d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Mining Surveying"
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
              Mining
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                Surveying
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Professional mining surveying services for mineral exploration, resource assessment, and mine planning across Rwanda
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
              Our Mining Survey Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive surveying solutions for the mining industry, from exploration to operational planning
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
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
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
              Recent Mining Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Successfully completed mining surveying projects across Rwanda
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
                <div className="h-48 bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                  <Mountain className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-sm font-medium">
                      {project.type}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
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

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Certified mining surveyors with extensive industry experience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Timely Delivery</h3>
              <p className="text-gray-600">Efficient surveying processes with quick turnaround times</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safety First</h3>
              <p className="text-gray-600">Committed to highest safety standards in all operations</p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
