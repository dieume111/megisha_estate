'use client';

import { motion } from 'framer-motion';
import { Building, ArrowRight, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { memo } from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t-4 border-[#C41E3A] text-gray-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C41E3A] flex items-center justify-center mr-3">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-[#C41E3A]">Megisha Estate</h4>
            </div>
            <p className="text-gray-600 mb-6">
              Your trusted partner in real estate excellence across Rwanda
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, color: "hover:bg-[#C41E3A]" },
                { icon: FaTwitter, color: "hover:bg-[#C41E3A]" },
                { icon: FaInstagram, color: "hover:bg-[#C41E3A]" },
                { icon: FaLinkedin, color: "hover:bg-[#C41E3A]" },
                { icon: FaWhatsapp, color: "hover:bg-[#C41E3A]" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center ${social.color} hover:text-white transition-all duration-300`}
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
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h5 className="text-lg font-bold text-[#C41E3A] mb-6">Properties</h5>
            <ul className="space-y-3 text-gray-600">
              {['Residential', 'Commercial', 'Villas', 'Apartments', 'Plots'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#C41E3A] transition-colors flex items-center">
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
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h5 className="text-lg font-bold text-[#C41E3A] mb-6">Services</h5>
            <ul className="space-y-3 text-gray-600">
              {['Surveying', 'Architecture', 'Management', 'Consulting', 'Machine Rentals'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#C41E3A] transition-colors flex items-center">
                    <ArrowRight className="w-3 h-3 mr-2" />
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="/admin/plots" className="hover:text-[#C41E3A] transition-colors flex items-center text-[#C41E3A] font-semibold">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  Admin Panel
                </a>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h5 className="text-lg font-bold text-[#C41E3A] mb-6">Contact Info</h5>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1 text-[#C41E3A]" />
                <span>Kigali, Rwanda</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-[#C41E3A]" />
                <span>+250 788 889 700</span>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="w-4 h-4 mr-3 text-[#C41E3A]" />
                <span>+250 788 889 700</span>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-3 text-[#C41E3A]">✉</span>
                <span>info@megishaestate.com</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600"
        >
          <p>&copy; 2026 Megisha Estate. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default memo(Footer);
