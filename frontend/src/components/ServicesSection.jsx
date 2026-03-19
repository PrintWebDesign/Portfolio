import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Plane, Sparkles, Baby, ArrowRight, Search, ChevronDown, ChevronUp, Syringe } from 'lucide-react';
import axios from 'axios';
import { Input } from './ui/input';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const iconMap = {
  clock: Clock,
  users: Users,
  plane: Plane,
  sparkles: Sparkles,
  baby: Baby,
  syringe: Syringe
};

const serviceImages = {
  'walk-in-clinic': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'family-practice': 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800',
  'travel-clinic': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
  'aesthetic-clinic': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
  'circumcision-clinic': 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800',
  'procedures': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
};

const serviceDetails = {
  'walk-in-clinic': {
    fullDescription: "Our Walk-in Clinic provides accessible healthcare for patients who need prompt medical attention without a scheduled appointment. Open Monday-Friday 9:00am-6:00pm and Saturday 10:00am-4:00pm. To minimize wait times, please call ahead at 905-693-6400. Same day appointments available.",
    highlights: ["No appointment necessary", "Same day appointments", "Call ahead: 905-693-6400", "STD testing and treatment", "Minor illness treatment", "Prescription services"]
  },
  'family-practice': {
    fullDescription: "Our Family Practice provides continuous, comprehensive healthcare for individuals and families across all ages. Dr. Saima Qureshi is currently accepting new patients. We focus on building long-term relationships to better understand and manage your health needs.",
    highlights: ["Dr. Saima Qureshi accepting new patients", "Annual health examinations", "Chronic disease management", "Preventive care & immunizations", "Mental health & ADHD assessments", "Women's health services"]
  },
  'travel-clinic': {
    fullDescription: "Planning an international trip? Our Travel Clinic is a registered Yellow Fever vaccination centre providing comprehensive pre-travel health services. We offer personalized consultations based on your destination, medical history, and itinerary. Book 4-6 weeks before travel.",
    highlights: ["Registered Yellow Fever Clinic", "Destination-specific vaccinations", "Hepatitis A & B, Typhoid vaccines", "Antimalarial prescriptions", "Travel health certificates", "CDC travel advisory guidance"]
  },
  'aesthetic-clinic': {
    fullDescription: "Our Aesthetic Clinic combines medical expertise with cutting-edge treatments to help you look and feel your best. We offer non-invasive and minimally invasive procedures performed by trained professionals in a safe, clinical environment.",
    highlights: ["Botox for headaches & migraines", "Hyperhidrosis treatment", "Anti-aging & wrinkle treatments", "Dermal fillers", "Natural non-surgical face lift", "Personalized consultations"]
  },
  'circumcision-clinic': {
    fullDescription: "Our Circumcision Clinic provides safe, professional circumcision services for newborns and infants in a comfortable, clinical setting. Our experienced medical team uses the latest techniques with a focus on minimizing discomfort and ensuring proper healing.",
    highlights: ["Services for newborns and infants", "Local anesthesia for comfort", "Experienced medical professionals", "Post-procedure care instructions", "Follow-up appointments included", "No referral required"]
  },
  'procedures': {
    fullDescription: "Milton Health Centre offers a comprehensive range of medical procedures performed by our experienced physicians. From diagnostic tests to minor surgical procedures, we provide convenient in-clinic services to meet your healthcare needs.",
    highlights: ["Lump, bump & mole biopsies", "Joint injections", "IUD insertion & contraception", "Blood work & lab tests", "ECG (electrocardiogram)", "STD testing & treatment"]
  }
};

const ServiceCard = ({ service, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[service.icon] || Clock;
  const image = serviceImages[service.id];
  const details = serviceDetails[service.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="col-span-1"
    >
      <div 
        data-testid={`service-card-${service.id}`}
        className="service-card h-full group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm"
      >
        {/* Service Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              <div className="icon-container w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <IconComponent size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-600 leading-relaxed mb-4">
            {service.shortDescription}
          </p>

          {/* Expandable Content */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid={`service-expand-${service.id}`}
            className="flex items-center gap-2 text-slate-900 font-medium hover:text-blue-600 transition-colors mb-4"
          >
            <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          <AnimatePresence>
            {isExpanded && details && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border-t border-slate-100 pt-4 mb-4">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {details.fullDescription}
                  </p>
                  <div className="space-y-2">
                    {details.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Link to detail page */}
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/services`);
        setServices(response.data.services);
        setFilteredServices(response.data.services);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback data
        const fallbackServices = [
          { id: 'walk-in-clinic', title: 'Walk-in Clinic', shortDescription: 'Same day appointments available. Call ahead at 905-693-6400 to minimize wait times.', icon: 'clock' },
          { id: 'family-practice', title: 'Family Practice', shortDescription: 'Dr. Saima Qureshi is accepting new patients. Comprehensive care for all ages.', icon: 'users' },
          { id: 'travel-clinic', title: 'Travel Clinic', shortDescription: 'Registered Yellow Fever clinic with destination-specific vaccinations and travel health services.', icon: 'plane' },
          { id: 'aesthetic-clinic', title: 'Aesthetic Clinic', shortDescription: 'Botox, fillers, hyperhidrosis treatment, and natural non-surgical face lift.', icon: 'sparkles' },
          { id: 'circumcision-clinic', title: 'Circumcision Clinic', shortDescription: 'Safe, professional circumcision services for newborns and infants.', icon: 'baby' },
          { id: 'procedures', title: 'Procedures', shortDescription: 'Biopsies, joint injections, IUD insertion, blood work, ECG, and STD testing.', icon: 'syringe' }
        ];
        setServices(fallbackServices);
        setFilteredServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices(services);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = services.filter(
        service => 
          service.title.toLowerCase().includes(query) ||
          service.shortDescription.toLowerCase().includes(query)
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

  return (
    <section 
      id="services" 
      data-testid="services-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#FAFAF9]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wide text-slate-500 uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            From routine checkups to specialized care, we offer a wide range of medical services to meet your health needs.
          </p>

          {/* Search/Filter */}
          <div className="relative max-w-md mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="service-search-input"
              className="pl-12 h-12 rounded-xl border-slate-200 bg-white"
            />
          </div>
        </motion.div>

        {/* Services Grid - All same size */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}

        {filteredServices.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-500 text-lg">No services found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              data-testid="clear-search-btn"
              className="mt-4 text-blue-500 hover:underline"
            >
              Clear search
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
