'use client';

import { motion } from 'framer-motion';
import { Home, Building, ArrowRight, Compass, Ruler, Store, Menu, X } from 'lucide-react';
import { useState, useRef, memo, useCallback, useEffect } from 'react';

interface NavigationProps {
  currentPage?: string;
}

function Navigation({ currentPage }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPropertiesDropdownOpen, setIsPropertiesDropdownOpen] = useState(false);
  const [isSurveyingDropdownOpen, setIsSurveyingDropdownOpen] = useState(false);
  const [isMachineryDropdownOpen, setIsMachineryDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const surveyingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const machineryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsScrolled(scrollPosition > viewportHeight - 200);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsPropertiesDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => setIsPropertiesDropdownOpen(false), 300);
  }, []);

  const handleSurveyingEnter = useCallback(() => {
    if (surveyingTimeoutRef.current) clearTimeout(surveyingTimeoutRef.current);
    setIsSurveyingDropdownOpen(true);
  }, []);

  const handleSurveyingLeave = useCallback(() => {
    surveyingTimeoutRef.current = setTimeout(() => setIsSurveyingDropdownOpen(false), 300);
  }, []);

  const handleMachineryEnter = useCallback(() => {
    if (machineryTimeoutRef.current) clearTimeout(machineryTimeoutRef.current);
    setIsMachineryDropdownOpen(true);
  }, []);

  const handleMachineryLeave = useCallback(() => {
    machineryTimeoutRef.current = setTimeout(() => setIsMachineryDropdownOpen(false), 300);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg border-b-2 border-[#C41E3A]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-3 shadow-lg transition-colors ${
              isScrolled ? 'bg-[#C41E3A]' : 'bg-white/90'
            }`}>
              <Building className={`w-7 h-7 ${isScrolled ? 'text-white' : 'text-[#C41E3A]'}`} />
            </div>
            <h1 className={`text-2xl font-bold transition-colors ${
              isScrolled ? 'text-[#C41E3A]' : 'text-white drop-shadow-lg'
            }`}>Megisha Estate</h1>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative">
              <div className="hover-area" onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}>
                <motion.button whileHover={{ scale: 1.05 }} className={`flex items-center space-x-2 transition-all group ${
                  isScrolled ? 'text-gray-700 hover:text-[#C41E3A]' : 'text-white hover:text-gray-200'
                }`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow transition-all ${
                    isScrolled ? 'bg-gray-100 group-hover:bg-[#C41E3A]' : 'bg-white/20 group-hover:bg-white/30'
                  }`}>
                    <Home className={`w-5 h-5 ${isScrolled ? 'group-hover:text-white' : 'text-white'}`} />
                  </div>
                  <span className="font-medium">Properties</span>
                  <ArrowRight className="w-3 h-3 transition-transform" style={{ transform: isPropertiesDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isPropertiesDropdownOpen ? 1 : 0, y: isPropertiesDropdownOpen ? 0 : -10 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  style={{ display: isPropertiesDropdownOpen ? 'block' : 'none' }}
                >
                  {[
                    { name: 'Plot', href: '/properties/plots', count: '36' },
                    { name: 'Residential', href: '/properties/residentials', count: '69' },
                    { name: 'Villa', href: '/properties/villa', count: '22' },
                    { name: 'Commercial', href: '/properties/commercial', count: '10' },
                    { name: 'Apartment', href: '/properties/appartment', count: '41' }
                  ].map((item) => (
                    <a key={item.name} href={item.href} className="block px-4 py-2 text-gray-700 hover:bg-[#FFF5F5] hover:text-[#C41E3A] transition-all">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500">({item.count})</span>
                      </div>
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="relative">
              <div className="hover-area" onMouseEnter={handleSurveyingEnter} onMouseLeave={handleSurveyingLeave}>
                <motion.button whileHover={{ scale: 1.05 }} className={`flex items-center space-x-2 transition-all group ${
                  isScrolled ? 'text-gray-700 hover:text-[#C41E3A]' : 'text-white hover:text-gray-200'
                }`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow transition-all ${
                    isScrolled ? 'bg-gray-100 group-hover:bg-[#C41E3A]' : 'bg-white/20 group-hover:bg-white/30'
                  }`}>
                    <Compass className={`w-5 h-5 ${isScrolled ? 'group-hover:text-white' : 'text-white'}`} />
                  </div>
                  <span className="font-medium">Surveying Services</span>
                  <ArrowRight className="w-3 h-3 transition-transform" style={{ transform: isSurveyingDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isSurveyingDropdownOpen ? 1 : 0, y: isSurveyingDropdownOpen ? 0 : -10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
                  onMouseEnter={handleSurveyingEnter}
                  onMouseLeave={handleSurveyingLeave}
                  style={{ display: isSurveyingDropdownOpen ? 'block' : 'none' }}
                >
                  {[
                    { name: 'Mining Surveying', href: '/surveying-services/mining-surveying' },
                    { name: 'Cadastral Surveying', href: '/surveying-services/cadastral-surveying' },
                    { name: 'Topographic Surveying', href: '/surveying-services/topographic-surveying' },
                    { name: 'Construction Surveying', href: '/surveying-services/construction-surveying' }
                  ].map((item) => (
                    <a key={item.name} href={item.href} className="block px-4 py-2 text-gray-700 hover:bg-[#FFF5F5] hover:text-[#C41E3A] transition-all">
                      <div className="font-medium">{item.name}</div>
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>

            <motion.a href="#" whileHover={{ scale: 1.05 }} className={`flex items-center space-x-2 transition-all group ${
              isScrolled ? 'text-gray-700 hover:text-[#C41E3A]' : 'text-white hover:text-gray-200'
            }`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow transition-all ${
                isScrolled ? 'bg-gray-100 group-hover:bg-[#C41E3A]' : 'bg-white/20 group-hover:bg-white/30'
              }`}>
                <Ruler className={`w-5 h-5 ${isScrolled ? 'group-hover:text-white' : 'text-white'}`} />
              </div>
              <span className="font-medium">Architectural service</span>
            </motion.a>

            <div className="relative">
              <div className="hover-area" onMouseEnter={handleMachineryEnter} onMouseLeave={handleMachineryLeave}>
                <motion.button whileHover={{ scale: 1.05 }} className={`flex items-center space-x-2 transition-all group ${
                  isScrolled ? 'text-gray-700 hover:text-[#C41E3A]' : 'text-white hover:text-gray-200'
                }`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow transition-all ${
                    isScrolled ? 'bg-gray-100 group-hover:bg-[#C41E3A]' : 'bg-white/20 group-hover:bg-white/30'
                  }`}>
                    <Store className={`w-5 h-5 ${isScrolled ? 'group-hover:text-white' : 'text-white'}`} />
                  </div>
                  <span className="font-medium">Megisha Store</span>
                  <ArrowRight className="w-3 h-3 transition-transform" style={{ transform: isMachineryDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isMachineryDropdownOpen ? 1 : 0, y: isMachineryDropdownOpen ? 0 : -10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
                  onMouseEnter={handleMachineryEnter}
                  onMouseLeave={handleMachineryLeave}
                  style={{ display: isMachineryDropdownOpen ? 'block' : 'none' }}
                >
                  {[
                    { name: 'Electronic Machines', href: '/megisha-machinery-store/electronic-machines' },
                    { name: 'Car Deals for sell', href: '/megisha-machinery-store/car-deals-for-sell' },
                    { name: 'Car Deals for rent', href: '/megisha-machinery-store/car-deals-for-rent' }
                  ].map((item) => (
                    <a key={item.name} href={item.href} className="block px-4 py-2 text-gray-700 hover:bg-[#FFF5F5] hover:text-[#C41E3A] transition-all">
                      <div className="font-medium">{item.name}</div>
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          <button className={`lg:hidden ${isScrolled ? 'text-[#C41E3A]' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

export default memo(Navigation);
