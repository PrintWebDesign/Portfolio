import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const services = [
    { id: 'walk-in-clinic', name: 'Walk-in Clinic' },
    { id: 'family-practice', name: 'Family Practice' },
    { id: 'travel-clinic', name: 'Travel Clinic' },
    { id: 'aesthetic-clinic', name: 'Aesthetic Clinic' },
    { id: 'circumcision-clinic', name: 'Circumcision Clinic' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            data-testid="nav-logo"
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-semibold text-slate-900 text-lg hidden sm:block">
              Milton Health Centre
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('services')}
              data-testid="nav-services-link"
              className="nav-link text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('doctors')}
              data-testid="nav-doctors-link"
              className="nav-link text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Our Team
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              data-testid="nav-testimonials-link"
              className="nav-link text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Testimonials
            </button>
            <Link 
              to="/blog"
              data-testid="nav-blog-link"
              className="nav-link text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Blog
            </Link>
            <button 
              onClick={() => scrollToSection('contact')}
              data-testid="nav-contact-link"
              className="nav-link text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Contact
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+19056936400"
              data-testid="nav-phone-btn"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              <Phone size={18} />
              <span>905-693-6400</span>
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              data-testid="nav-book-btn"
              className="rounded-full bg-slate-900 text-white px-6 py-2.5 font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-lg"
          >
            <div className="px-6 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('services')}
                data-testid="mobile-services-link"
                className="block w-full text-left text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('doctors')}
                data-testid="mobile-doctors-link"
                className="block w-full text-left text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors"
              >
                Our Team
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                data-testid="mobile-testimonials-link"
                className="block w-full text-left text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors"
              >
                Testimonials
              </button>
              <Link 
                to="/blog"
                data-testid="mobile-blog-link"
                className="block text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors"
              >
                Blog
              </Link>
              <button 
                onClick={() => scrollToSection('contact')}
                data-testid="mobile-contact-link"
                className="block w-full text-left text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors"
              >
                Contact
              </button>
              
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <a 
                  href="tel:+19056936400"
                  data-testid="mobile-phone-link"
                  className="flex items-center gap-2 text-slate-600 font-medium"
                >
                  <Phone size={18} />
                  <span>905-693-6400</span>
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  data-testid="mobile-book-btn"
                  className="block w-full text-center rounded-full bg-slate-900 text-white px-6 py-3 font-semibold hover:bg-slate-800 transition-all"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
