'use client';

import { motion } from 'framer-motion';
import { Mountain, MapPin, Map, Trees, Droplets, Compass, Activity, Layers, Award } from 'lucide-react';

export default function TopographicSurveyingPage() {
  const services = [
    {
      title: "Contour Mapping",
      description: "Detailed mapping of land elevation and contour lines",
      icon: Mountain,
      features: ["Elevation Survey", "Contour Lines", "Spot Heights", "Cross Sections"]
    },
    {
      title: "Digital Terrain Modeling",
      description: "Creating 3D digital models of terrain surfaces",
      icon: Layers,
      features: ["3D Modeling", "Surface Analysis", "Volume Calculation", "Visualization"]
    },
    {
      title: "Hydrographic Survey",
      description: "Surveying of water bodies and drainage patterns",
      icon: Droplets,
      features: ["Water Body Mapping", "Drainage Analysis", "Flood Assessment", "Water Flow Studies"]
    },
    {
      title: "Vegetation Mapping",
      description: "Mapping and analysis of vegetation cover and types",
      icon: Trees,
      features: ["Tree Survey", "Vegetation Classification", "Cover Analysis", "Environmental Assessment"]
    }
  ];

  const projects = [
    {
      name: "Urban Development Survey - Kigali Heights",
      location: "Kigali, Rwanda",
      type: "Urban Planning",
      area: "2.5 km²",
      elevation: "1500-1800m",
      status: "Completed",
      description: "Comprehensive topographic survey for urban development project"
    },
    {
      name: "Agricultural Land Survey - Eastern Province",
      location: "Nyagatare, Rwanda",
      type: "Agricultural",
      area: "10 km²",
      elevation: "1400-1600m",
      status: "Completed",
      description: "Large-scale agricultural land topographic mapping"
    },
    {
      name: "Infrastructure Development - Northern Province",
      location: "Musanze, Rwanda",
      type: "Infrastructure",
      area: "5 km²",
      elevation: "1800-2200m",
      status: "In Progress",
      description: "Topographic survey for road and infrastructure development"
    }
  ];

  const technologies = [
    { name: "GPS/GNSS Surveying", description: "High-precision satellite positioning systems" },
    { name: "Total Station", description: "Electronic distance and angle measurement equipment" },
    { name: "Drone Mapping", description: "Aerial photogrammetry and LiDAR scanning" },
    { name: "GIS Software", description: "Advanced geographic information systems" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Topographic Surveying"
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
              Topographic
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-400">
                Surveying
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Professional topographic surveying services for land mapping, terrain analysis, and development planning across Rwanda
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
              Our Topographic Survey Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive topographic surveying solutions for terrain mapping and land analysis
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
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
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
              Topographic Survey Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Successfully completed topographic surveying projects across Rwanda
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
                <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                  <Mountain className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-green-500" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-medium">
                      {project.type}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Activity className="w-4 h-4 mr-2 text-green-500" />
                      <span>Area: {project.area}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mountain className="w-4 h-4 mr-2 text-green-500" />
                      <span>Elevation: {project.elevation}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
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
              Advanced Surveying Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art equipment and software for precise topographic surveys
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.name}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
