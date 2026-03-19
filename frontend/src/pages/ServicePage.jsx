import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Clock, Users, Plane, Sparkles, Baby, Phone } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import ContactSection from '../components/ContactSection';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const iconMap = {
  clock: Clock,
  users: Users,
  plane: Plane,
  sparkles: Sparkles,
  baby: Baby
};

const serviceImages = {
  'walk-in-clinic': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
  'family-practice': 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1200',
  'travel-clinic': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200',
  'aesthetic-clinic': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200',
  'circumcision-clinic': 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1200'
};

const ServicePage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/services`);
        const foundService = response.data.services.find(s => s.id === serviceId);
        setService(foundService);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#FAFAF9]">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Service Not Found</h1>
          <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || Clock;

  return (
    <div data-testid="service-page" className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={serviceImages[serviceId] || serviceImages['walk-in-clinic']}
            alt={service.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF9]/50 to-[#FAFAF9]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/#services" 
              data-testid="back-to-services-link"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Services</span>
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center">
                <IconComponent size={32} className="text-white" />
              </div>
              <span className="text-sm font-medium tracking-wide text-slate-500 uppercase">Our Services</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
              {service.title}
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-12">
              What We Offer
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check size={18} className="text-green-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Contact us today to learn more about our {service.title.toLowerCase()} services or to schedule a consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="service-contact-btn"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 px-8 py-4 font-semibold hover:bg-slate-100 transition-all"
              >
                Contact Us
              </button>
              <a
                href="tel:+19055550123"
                data-testid="service-call-btn"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white px-8 py-4 font-semibold hover:bg-white/10 transition-all"
              >
                <Phone size={20} />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
      
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ServicePage;
