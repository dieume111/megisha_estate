 'use client';

import { motion } from 'framer-motion';
import { 
  Building, 
  ArrowRight,
  MapPin,
  Phone
} from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { memo } from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-cover bg-center bg-blend-overlay" 
                   style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687942-7a7c3c8c8b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80)' }}>
                <div className="w-10 h-10 rounded-lg bg-blue-500/80 flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
              </div>
              <h4 className="text-2xl font-bold">Megisha Estate</h4>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner in real estate excellence across Rwanda
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, color: "hover:text-blue-400" },
                { icon: FaTwitter, color: "hover:text-blue-300" },
                { icon: FaInstagram, color: "hover:text-pink-400" },
                { icon: FaLinkedin, color: "hover:text-blue-500" },
                { icon: FaWhatsapp, color: "hover:text-green-400" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition-colors duration-300`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h5 className="text-lg font-bold mb-6">Properties</h5>
            <ul className="space-y-3 text-gray-400">
              {['Residential', 'Commercial', 'Villas', 'Apartments', 'Plots'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors duration-300 flex items-center">
                    <ArrowRight className="w-3 h-3 mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h5 className="text-lg font-bold mb-6">Services</h5>
            <ul className="space-y-3 text-gray-400">
              {['Surveying', 'Architecture', 'Management', 'Consulting', 'Machine Rentals'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors duration-300 flex items-center">
                    <ArrowRight className="w-3 h-3 mr-2" />
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="/admin/plots" className="hover:text-white transition-colors duration-300 flex items-center text-blue-400 font-semibold">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  Admin Panel
                </a>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h5 className="text-lg font-bold mb-6">Contact Info</h5>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1 text-blue-400" />
                <span>Kigali, Rwanda</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-blue-400" />
                <span>+250 788 889 700</span>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="w-4 h-4 mr-3 text-blue-400" />
                <span>+250 788 889 700</span>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-3 text-blue-400">✉</span>
                <span>info@megishaestate.com</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2026 Megisha Estate. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default memo(Footer);
