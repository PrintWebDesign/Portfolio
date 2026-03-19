import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/testimonials`);
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback data
        setTestimonials([
          {
            id: '1',
            name: 'Sarah Johnson',
            role: 'Family Patient',
            content: 'Dr. Qureshi and the team at Milton Health Centre have been exceptional. The care and attention they provide is unmatched.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
          },
          {
            id: '2',
            name: 'Michael Chen',
            role: 'Travel Clinic Client',
            content: 'Got all my vaccinations for my trip to Southeast Asia. The staff was knowledgeable and made the process smooth.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
          },
          {
            id: '3',
            name: 'Emily Rodriguez',
            role: 'Aesthetic Client',
            content: 'The aesthetic treatments here are top-notch. Professional staff, clean environment, and amazing results.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
          },
          {
            id: '4',
            name: 'David Thompson',
            role: 'Walk-in Patient',
            content: 'Needed urgent care on a Saturday and was seen quickly. The doctors were thorough and caring.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} 
      />
    ));
  };

  // Duplicate testimonials for seamless marquee
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section 
      id="testimonials" 
      data-testid="testimonials-section"
      className="py-24 md:py-32 bg-[#FAFAF9] overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 px-6 md:px-12 lg:px-24"
      >
        <span className="text-sm font-medium tracking-wide text-slate-500 uppercase mb-4 block">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6">
          What Our Patients Say
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Don't just take our word for it — hear from the patients who trust us with their health.
        </p>
      </motion.div>

      {/* Marquee Container */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
      ) : (
        <div ref={containerRef} className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFAF9] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFAF9] to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Track */}
          <div className="flex animate-marquee hover:pause">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                data-testid={`testimonial-card-${testimonial.id}-${index}`}
                className="testimonial-card flex-shrink-0 mx-3"
              >
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  {/* Quote Icon */}
                  <Quote size={32} className="text-slate-200 mb-4" />
                  
                  {/* Rating */}
                  <div className="flex gap-0.5 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Content */}
                  <p className="text-slate-700 leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=E2E8F0&color=64748B`}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
