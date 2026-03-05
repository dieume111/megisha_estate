'use client';

import { motion } from 'framer-motion';
import { 
  Home, 
  Building, 
  ArrowRight,
  Compass,
  Ruler,
  Store,
  Menu,
  X
} from 'lucide-react';
import { useState, useRef, memo, useCallback } from 'react';

interface NavigationProps {
  currentPage?: string;
}

function Navigation({ currentPage }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPropertiesDropdownOpen, setIsPropertiesDropdownOpen] = useState(false);
  const [isSurveyingDropdownOpen, setIsSurveyingDropdownOpen] = useState(false);
  const [isMachineryDropdownOpen, setIsMachineryDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const surveyingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const machineryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsPropertiesDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsPropertiesDropdownOpen(false);
      dropdownTimeoutRef.current = null;
    }, 300);
  }, []);

  const handleSurveyingEnter = useCallback(() => {
    if (surveyingTimeoutRef.current) {
      clearTimeout(surveyingTimeoutRef.current);
      surveyingTimeoutRef.current = null;
    }
    setIsSurveyingDropdownOpen(true);
  }, []);

  const handleSurveyingLeave = useCallback(() => {
    surveyingTimeoutRef.current = setTimeout(() => {
      setIsSurveyingDropdownOpen(false);
      surveyingTimeoutRef.current = null;
    }, 300);
  }, []);

  const handleMachineryEnter = useCallback(() => {
    if (machineryTimeoutRef.current) {
      clearTimeout(machineryTimeoutRef.current);
      machineryTimeoutRef.current = null;
    }
    setIsMachineryDropdownOpen(true);
  }, []);

  const handleMachineryLeave = useCallback(() => {
    machineryTimeoutRef.current = setTimeout(() => {
      setIsMachineryDropdownOpen(false);
      machineryTimeoutRef.current = null;
    }, 300);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[#365D77] shadow-xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <Building className="w-6 h-6 text-[#365D77]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Megisha Estate</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Properties with Dropdown */}
            <div className="relative">
              <div className="hover-area" onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}>
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-all duration-300 group"
                >
                  <motion.div
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Home className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-sm font-medium">Properties</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300" 
                    style={{ transform: isPropertiesDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} 
                  />
                </motion.button>

                {/* Dropdown Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: isPropertiesDropdownOpen ? 1 : 0,
                    y: isPropertiesDropdownOpen ? 0 : -10
                  }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-56 bg-[#2a4658] rounded-lg shadow-xl overflow-hidden z-50"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  style={{ display: isPropertiesDropdownOpen ? 'block' : 'none' }}
                >
                  <div className="py-1">
                    {[
                      { name: 'Plot', href: '/properties/plots', count: '36' },
                      { name: 'Residential', href: '/properties/residentials', count: '69' },
                      { name: 'Villa', href: '/properties/villa', count: '22' },
                      { name: 'Commercial', href: '/properties/commercial', count: '10' },
                      { name: 'Apartment', href: '/properties/appartment', count: '41' }
                    ].map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-white hover:bg-[#365D77] transition-all duration-200"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 2 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-xs text-gray-300">({item.count})</span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Surveying Services with Dropdown */}
            <div className="relative">
              <div className="hover-area" onMouseEnter={handleSurveyingEnter} onMouseLeave={handleSurveyingLeave}>
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-all duration-300 group"
                >
                  <motion.div
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Compass className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-sm font-medium">Surveying Services</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300" 
                    style={{ transform: isSurveyingDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} 
                  />
                </motion.button>

                {/* Surveying Dropdown Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: isSurveyingDropdownOpen ? 1 : 0,
                    y: isSurveyingDropdownOpen ? 0 : -10
                  }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-[#2a4658] rounded-lg shadow-xl overflow-hidden z-50"
                  onMouseEnter={handleSurveyingEnter}
                  onMouseLeave={handleSurveyingLeave}
                  style={{ display: isSurveyingDropdownOpen ? 'block' : 'none' }}
                >
                  <div className="py-1">
                    {[
                      { name: 'Mining Surveying', href: '/surveying-services/mining-surveying' },
                      { name: 'Cadastral Surveying', href: '/surveying-services/cadastral-surveying' },
                      { name: 'Topographic Surveying', href: '/surveying-services/topographic-surveying' },
                      { name: 'Construction Surveying', href: '/surveying-services/construction-surveying' }
                    ].map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-white hover:bg-[#365D77] transition-all duration-200"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 2 }}
                      >
                        <div className="text-sm font-medium">{item.name}</div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Architectural Services */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-all duration-300 group"
            >
              <motion.div
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <Ruler className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-sm font-medium">Architectural service</span>
            </motion.a>

            {/* Megisha Store with Dropdown */}
            <div className="relative">
              <div className="hover-area" onMouseEnter={handleMachineryEnter} onMouseLeave={handleMachineryLeave}>
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-all duration-300 group"
                >
                  <motion.div
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Store className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-sm font-medium">Megisha Store</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300" 
                    style={{ transform: isMachineryDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} 
                  />
                </motion.button>

                {/* Store Dropdown Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: isMachineryDropdownOpen ? 1 : 0,
                    y: isMachineryDropdownOpen ? 0 : -10
                  }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-[#2a4658] rounded-lg shadow-xl overflow-hidden z-50"
                  onMouseEnter={handleMachineryEnter}
                  onMouseLeave={handleMachineryLeave}
                  style={{ display: isMachineryDropdownOpen ? 'block' : 'none' }}
                >
                  <div className="py-1">
                    {[
                      { name: 'Electronic Machines', href: '/megisha-machinery-store/electronic-machines' },
                      { name: 'Car Deals for sell', href: '/megisha-machinery-store/car-deals-for-sell' },
                      { name: 'Car Deals for rent', href: '/megisha-machinery-store/car-deals-for-rent' }
                    ].map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-white hover:bg-[#365D77] transition-all duration-200"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 2 }}
                      >
                        <div className="text-sm font-medium">{item.name}</div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-2 px-4">Properties</h4>
              <div className="space-y-1">
                {[
                  { name: 'Plot (36)', href: '/properties/plots' },
                  { name: 'Residential (69)', href: '/properties/residentials' },
                  { name: 'Villa (22)', href: '/properties/villa' },
                  { name: 'Commercial (10)', href: '/properties/commercial' },
                  { name: 'Apartment (41)', href: '/properties/appartment' }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-white hover:bg-[#2a4658] rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-2 px-4">Surveying Services</h4>
              <div className="space-y-1">
                {[
                  { name: 'Mining Surveying', href: '/surveying-services/mining-surveying' },
                  { name: 'Cadastral Surveying', href: '/surveying-services/cadastral-surveying' },
                  { name: 'Topographic Surveying', href: '/surveying-services/topographic-surveying' },
                  { name: 'Construction Surveying', href: '/surveying-services/construction-surveying' }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-white hover:bg-[#2a4658] rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <a href="#" className="block px-4 py-2 text-white hover:bg-[#2a4658] rounded-lg transition-colors font-semibold">
              Architectural service
            </a>
            
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-2 px-4">Megisha Store</h4>
              <div className="space-y-1">
                {[
                  { name: 'Electronic Machines', href: '/megisha-machinery-store/electronic-machines' },
                  { name: 'Car Deals for sell', href: '/megisha-machinery-store/car-deals-for-sell' },
                  { name: 'Car Deals for rent', href: '/megisha-machinery-store/car-deals-for-rent' }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-white hover:bg-[#2a4658] rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default memo(Navigation);
