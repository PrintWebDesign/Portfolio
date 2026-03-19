import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Award } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      data-testid="hero-section"
      className="hero-section relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1600"
          alt="Doctor consultation with patient"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF9] via-[#FAFAF9]/95 to-[#FAFAF9]/70"></div>
        <div className="absolute inset-0 hero-overlay"></div>
      </motion.div>

      {/* Subtle Glow Effect */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] subtle-glow rounded-full"></div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-20"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700">Dr. Saima Qureshi accepting new patients</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Advanced Care,{' '}
            <span className="font-accent italic text-blue-600">Human</span>{' '}
            Touch
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-xl"
          >
            Milton Health Centre provides a safe, caring, and compassionate environment where patients are actively listened to and offered professional medical advice.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              data-testid="hero-book-btn"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-8 py-4 font-semibold shadow-lg"
            >
              Book Appointment
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              data-testid="hero-services-btn"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 border border-slate-200 px-8 py-4 font-medium hover:bg-slate-50 transition-all shadow-sm hover:shadow-md"
            >
              Explore Services
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
                <MapPin size={22} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-semibold text-slate-900">Milton, Ontario</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
                <Clock size={22} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Walk-in Hours</p>
                <p className="font-semibold text-slate-900">Mon-Fri 9-6, Sat 10-4</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
                <Award size={22} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Same Day</p>
                <p className="font-semibold text-slate-900">Appointments Available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-slate-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
