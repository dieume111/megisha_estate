'use client';

import { motion } from 'framer-motion';
import { Building, HardHat, Ruler, Shield, MapPin, Clock, Award, Users, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ConstructionSurveyingPage() {
  const services = [
    {
      title: "Site Layout Survey",
      description: "Precise marking and layout of construction sites according to design plans",
      icon: MapPin,
      features: ["Building Layout", "Foundation Marking", "Grid Establishment", "Control Points"]
    },
    {
      title: "Construction Monitoring",
      description: "Continuous monitoring during construction to ensure accuracy",
      icon: HardHat,
      features: ["Progress Monitoring", "Dimensional Control", "Alignment Checks", "Quality Assurance"]
    },
    {
      title: "As-Built Survey",
      description: "Final survey of completed structures for documentation",
      icon: Building,
      features: ["Final Measurements", "Documentation", "Deviation Analysis", "Completion Reports"]
    },
    {
      title: "Deformation Monitoring",
      description: "Monitoring structural movement and settlement during and after construction",
      icon: Shield,
      features: ["Settlement Monitoring", "Movement Detection", "Structural Analysis", "Safety Assessment"]
    }
  ];

  const projects = [
    {
      name: "Commercial Complex - Kigali City Center",
      location: "Kigali, Rwanda",
      type: "Commercial",
      floors: "25 Floors",
      area: "15,000 m²",
      status: "Completed",
      description: "Complete construction surveying for high-rise commercial complex"
    },
    {
      name: "Residential Development - Nyarutarama",
      location: "Nyarutarama, Kigali",
      type: "Residential",
      floors: "10 Buildings",
      area: "8,000 m²",
      status: "In Progress",
      description: "Multi-building residential complex construction monitoring"
    },
    {
      name: "Industrial Facility - Special Economic Zone",
      location: "Masoro, Rwanda",
      type: "Industrial",
      floors: "Single Level",
      area: "20,000 m²",
      status: "Planning",
      description: "Large-scale industrial facility construction surveying"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Design Review",
      description: "Review architectural and engineering plans",
      icon: Ruler
    },
    {
      step: "2", 
      title: "Site Preparation",
      description: "Establish control points and reference marks",
      icon: MapPin
    },
    {
      step: "3",
      title: "Layout Marking",
      description: "Mark building foundations and structural elements",
      icon: Building
    },
    {
      step: "4",
      title: "Quality Control",
      description: "Monitor construction progress and accuracy",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541882090-65e832e95b85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Construction Surveying"
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
              Construction
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-400">
                Surveying
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Professional construction surveying services for site layout, monitoring, and quality control across Rwanda
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
              Our Construction Survey Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive construction surveying solutions for accurate building layout and monitoring
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
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
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
              Construction Survey Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Successfully completed construction surveying projects across Rwanda
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
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                  <Building className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-sm font-medium">
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
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{project.floors}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Ruler className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{project.area}</span>
                    </div>
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
              Our Construction Survey Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic approach to construction surveying from planning to completion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
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
              Safety & Quality Standards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Committed to highest safety standards and quality control in all construction surveys
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safety First</h3>
              <p className="text-gray-600">Strict adherence to safety protocols and construction site regulations</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Control</h3>
              <p className="text-gray-600">Rigorous quality checks and precision measurements throughout construction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Risk Management</h3>
              <p className="text-gray-600">Proactive identification and mitigation of construction survey risks</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
