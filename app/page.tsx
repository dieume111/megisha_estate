'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building, MapPin, DollarSign, Shield, Users, Award, Zap, Search, Bed, ChevronLeft, ChevronRight, Share2, MessageCircle, ArrowRight, Bath, Maximize, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import { memo, useState, useEffect, useRef } from 'react';

const slideImages = [
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.03.55 (1).jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.03.59.jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.01.jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.02.jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.04.jpeg',
  '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.05.jpeg',
];

const propertyOverlays = [
  { title: 'Luxury Villa in Kigali', location: 'Nyarutarama', price: 'RWF 85,000,000', beds: 4, baths: 3, area: '450 sqm' },
  { title: 'Modern Family Home', location: 'Kacyiru', price: 'RWF 65,000,000', beds: 3, baths: 2, area: '320 sqm' },
  { title: 'Executive Residence', location: 'Kimihurura', price: 'RWF 95,000,000', beds: 5, baths: 4, area: '520 sqm' },
  { title: 'Contemporary Villa', location: 'Gisozi', price: 'RWF 72,000,000', beds: 4, baths: 3, area: '380 sqm' },
  { title: 'Elegant Estate', location: 'Kiyovu', price: 'RWF 120,000,000', beds: 6, baths: 5, area: '650 sqm' },
  { title: 'Premium Property', location: 'Rebero', price: 'RWF 78,000,000', beds: 4, baths: 3, area: '410 sqm' },
];

const featuredProperties = [
  { id: 1, title: 'Modern Villa', location: 'Nyarutarama', price: 'RWF 85M', beds: 4, baths: 3, area: '450 sqm', image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.06.jpeg' },
  { id: 2, title: 'Luxury Apartment', location: 'Kimihurura', price: 'RWF 45M', beds: 3, baths: 2, area: '180 sqm', image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.04.11.jpeg' },
  { id: 3, title: 'Executive Home', location: 'Kacyiru', price: 'RWF 65M', beds: 4, baths: 3, area: '320 sqm', image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.26.jpeg' },
  { id: 4, title: 'Premium Estate', location: 'Gisozi', price: 'RWF 95M', beds: 5, baths: 4, area: '520 sqm', image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.27.jpeg' },
  { id: 5, title: 'Elegant Villa', location: 'Kiyovu', price: 'RWF 120M', beds: 6, baths: 5, area: '650 sqm', image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.28.jpeg' },
  { id: 6, title: 'Spacious Home', location: 'Kagugu', price: 'RWF 55M', beds: 3, baths: 2, area: '280 sqm', image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.29.jpeg' },
];

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [propertyScroll, setPropertyScroll] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = slideImages.map(src => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };
    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [imagesLoaded]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);

  const scrollToProperty = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 3;
      scrollRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
      setPropertyScroll(index);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Feedback Ribbon */}
      <button
        onClick={() => setFeedbackOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#C41E3A] text-white px-2 py-4 rounded-l-lg shadow-lg z-50 hover:bg-[#8B0000] transition-colors text-xs"
        style={{ writingMode: 'vertical-rl' }}
      >
        <MessageCircle className="w-4 h-4 inline mr-1" />
        Feedback
      </button>

      {/* Feedback Drawer */}
      <AnimatePresence>
        {feedbackOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setFeedbackOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-1/2 -translate-y-1/2 w-96 bg-white shadow-2xl z-50 p-6 rounded-l-2xl"
            >
              <h3 className="text-2xl font-bold text-[#C41E3A] mb-4">Send Feedback</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border-2 border-[#C41E3A] rounded-lg focus:border-[#8B0000] focus:outline-none placeholder:text-gray-500" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border-2 border-[#C41E3A] rounded-lg focus:border-[#8B0000] focus:outline-none placeholder:text-gray-500" />
                <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2 border-2 border-[#C41E3A] rounded-lg focus:border-[#8B0000] focus:outline-none placeholder:text-gray-500" />
                <button type="submit" className="w-full bg-[#C41E3A] text-white py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-colors">
                  Submit
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Slideshow */}
      <section className="relative h-screen overflow-hidden bg-gray-900">
        {!imagesLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#C41E3A]"></div>
          </div>
        ) : (
          <>
            {slideImages.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image src={img} alt={`Property ${idx + 1}`} fill className="object-cover" priority={idx === 0} sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
              </div>
            ))}
            
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <motion.div
                key={`overlay-${currentSlide}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/30 backdrop-blur-md p-8 rounded-2xl w-[500px] shadow-2xl"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {propertyOverlays[currentSlide].title}
                </h1>
                <div className="flex items-center text-white mb-4">
                  <MapPin className="w-5 h-5 mr-2 text-[#C41E3A]" />
                  <span className="text-lg">{propertyOverlays[currentSlide].location}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Bed className="w-6 h-6 mx-auto mb-1 text-[#C41E3A]" />
                    <p className="text-sm text-white">{propertyOverlays[currentSlide].beds} Beds</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-6 h-6 mx-auto mb-1 text-[#C41E3A]" />
                    <p className="text-sm text-white">{propertyOverlays[currentSlide].baths} Baths</p>
                  </div>
                  <div className="text-center">
                    <Maximize className="w-6 h-6 mx-auto mb-1 text-[#C41E3A]" />
                    <p className="text-sm text-white">{propertyOverlays[currentSlide].area}</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#C41E3A] mb-6">
                  {propertyOverlays[currentSlide].price}
                </div>
                <button className="w-full bg-[#C41E3A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-colors">
                  View Details
                </button>
              </motion.div>
            </div>

            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-white transition-colors">
              <ChevronLeft className="w-6 h-6 text-[#C41E3A]" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-white transition-colors">
              <ChevronRight className="w-6 h-6 text-[#C41E3A]" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {slideImages.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-[#C41E3A] w-8' : 'bg-white/50 w-3'}`} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Search Section */}
      <section className="relative -mt-32 z-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-[#C41E3A] mb-6 flex items-center">
              <Search className="w-6 h-6 mr-2" />
              Find Your Dream Property
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <input type="text" placeholder="Location" className="px-4 py-3 border-2 border-[#C41E3A] rounded-lg focus:border-[#8B0000] focus:outline-none placeholder:text-gray-600" />
              <select className="px-4 py-3 border-2 border-[#C41E3A] rounded-lg focus:border-[#8B0000] focus:outline-none text-gray-700">
                <option>Property Type</option>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Villa</option>
              </select>
              <select className="px-4 py-3 border-2 border-[#C41E3A] rounded-lg focus:border-[#8B0000] focus:outline-none text-gray-700">
                <option>Bedrooms</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
              </select>
              <select className="px-4 py-3 border-2 border-[#C41E3A] rounded-lg focus:border-[#8B0000] focus:outline-none text-gray-700">
                <option>Status</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
              <select className="px-4 py-3 border-2 border-[#C41E3A] rounded-lg focus:border-[#8B0000] focus:outline-none text-gray-700">
                <option>Price Range</option>
                <option>Under 20M</option>
                <option>20M - 50M</option>
                <option>50M - 100M</option>
                <option>100M - 200M</option>
                <option>200M+</option>
              </select>
            </div>
            <button className="w-full mt-4 bg-[#C41E3A] text-white py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-colors flex items-center justify-center">
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600">Discover our handpicked selection of premium properties</p>
          </motion.div>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollbarWidth: 'none' }}>
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="min-w-[calc(33.333%-16px)] snap-start bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="33vw"
                  />
                  <div className="absolute top-3 right-3 bg-[#C41E3A] text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1 text-[#C41E3A]" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1 text-[#C41E3A]" />
                      <span className="text-sm">{property.beds}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1 text-[#C41E3A]" />
                      <span className="text-sm">{property.baths}</span>
                    </div>
                    <div className="flex items-center">
                      <Maximize className="w-4 h-4 mr-1 text-[#C41E3A]" />
                      <span className="text-sm">{property.area}</span>
                    </div>
                  </div>
                  
                  <div className="text-xl font-bold text-[#C41E3A] mb-3">{property.price}</div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#C41E3A] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#8B0000] transition-colors flex items-center justify-center">
                      <FaWhatsapp className="w-4 h-4 mr-1" />
                      WhatsApp
                    </button>
                    <button className="p-2 border-2 border-[#C41E3A] text-[#C41E3A] rounded-lg hover:bg-[#C41E3A] hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button className="w-full mt-2 border-2 border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:border-[#C41E3A] hover:text-[#C41E3A] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => scrollToProperty(idx)}
                className={`w-3 h-3 rounded-full transition-all ${propertyScroll === idx ? 'bg-[#C41E3A] w-8' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-[#C41E3A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-colors inline-flex items-center">
              See More Properties
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive real estate and surveying solutions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Mining Surveying", image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.31.jpeg' },
              { title: "Property Management", image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.32.jpeg' },
              { title: "Construction Surveying", image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.33 (1).jpeg' },
              { title: "Architecture Design", image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.33.jpeg' }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-80 rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h4 className="text-2xl font-bold text-white mb-2">{service.title}</h4>
                    <button className="text-white text-sm font-semibold hover:underline flex items-center">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#C41E3A] relative overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hexagons" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
                <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="white" strokeWidth="2"/>
                <path d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34" fill="none" stroke="white" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Stacked Testimonials */}
            <div className="relative h-[500px]">
              {[
                { name: "Jean Mugisha", role: "Property Investor", content: "Excellent service and professionalism throughout the process. The team went above and beyond to ensure I found the perfect investment property." },
                { name: "Grace Uwimana", role: "Homeowner", content: "Made my first home buying experience smooth and stress-free. I couldn't have asked for better guidance and support." },
                { name: "Patrick Niyonzima", role: "Commercial Client", content: "Deep understanding of commercial real estate needs. Their expertise helped me secure an excellent location for my business." },
                { name: "Marie Kamanzi", role: "Villa Owner", content: "Professional, reliable, and trustworthy. They made the entire process seamless from start to finish." },
                { name: "David Habimana", role: "Investor", content: "Outstanding market knowledge and exceptional customer service. Highly recommend their services to anyone." }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, zIndex: 50 }}
                  className="absolute bg-white p-6 rounded-xl shadow-2xl cursor-pointer transition-all duration-300"
                  style={{
                    top: `${index * 80}px`,
                    left: `${index * 20}px`,
                    width: 'calc(100% - ' + (index * 20) + 'px)',
                    zIndex: 5 - index,
                    transform: `rotate(${index * -2}deg)`
                  }}
                >
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#C41E3A] text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-sm">"{testimonial.content}"</p>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Title */}
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-bold mb-6">What Our Clients Say</h2>
                <p className="text-xl text-white/90 mb-8">
                  Trusted by hundreds of satisfied clients across Rwanda. Their success stories speak for our commitment to excellence.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">500+</h3>
                      <p className="text-white/80">Happy Clients</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">4.9/5</h3>
                      <p className="text-white/80">Average Rating</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600">Trusted by leading organizations</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((partner) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-32 hover:shadow-lg transition-shadow"
              >
                <Building className="w-16 h-16 text-[#C41E3A]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">News & Updates</h2>
            <p className="text-xl text-gray-600">Stay informed with latest real estate news</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "New Property Listings in Kigali", date: "March 15, 2026", image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.28.jpeg' },
              { title: "Real Estate Market Trends 2026", date: "March 10, 2026", image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.29.jpeg' },
              { title: "Investment Opportunities in Rwanda", date: "March 5, 2026", image: '/images/1080x/WhatsApp Image 2026-03-07 at 11.10.30.jpeg' }
            ].map((news, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#C41E3A] mb-2">{news.date}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{news.title}</h3>
                  <button className="text-[#C41E3A] font-semibold hover:underline flex items-center">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#C41E3A] relative overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hexagons-cta" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
                <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="white" strokeWidth="2"/>
                <path d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34" fill="none" stroke="white" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons-cta)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Dream Property?
          </h3>
          <p className="text-xl text-white/90 mb-8">
            Let our expert team help you discover the perfect home
          </p>
          <button className="bg-white text-[#C41E3A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all inline-flex items-center">
            <FaWhatsapp className="w-6 h-6 mr-2" />
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
}

export default memo(HomePage);
