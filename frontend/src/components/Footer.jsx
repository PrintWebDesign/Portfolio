import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    { name: 'Walk-in Clinic', path: '/services/walk-in-clinic' },
    { name: 'Family Practice', path: '/services/family-practice' },
    { name: 'Travel Clinic', path: '/services/travel-clinic' },
    { name: 'Aesthetic Clinic', path: '/services/aesthetic-clinic' },
    { name: 'Circumcision Clinic', path: '/services/circumcision-clinic' }
  ];

  const quickLinks = [
    { name: 'About Us', href: '/#about' },
    { name: 'Our Team', href: '/#doctors' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', href: '/#contact' }
  ];

  return (
    <footer data-testid="footer" className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">M</span>
              </div>
              <span className="font-semibold text-lg">Milton Health Centre</span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Providing compassionate, patient-centered healthcare to the Milton community and surrounding areas.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                data-testid="footer-facebook-link"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                data-testid="footer-instagram-link"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                data-testid="footer-twitter-link"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                data-testid="footer-linkedin-link"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path}
                    data-testid={`footer-${service.name.toLowerCase().replace(/\s+/g, '-')}-link`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.path ? (
                    <Link 
                      to={link.path}
                      data-testid={`footer-${link.name.toLowerCase().replace(/\s+/g, '-')}-link`}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href}
                      data-testid={`footer-${link.name.toLowerCase().replace(/\s+/g, '-')}-link`}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
              <li>
                <a 
                  href="/#contact"
                  data-testid="footer-book-appointment-link"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <a 
                    href="tel:+19056936400"
                    data-testid="footer-phone-link"
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    905-693-6400
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <a 
                    href="mailto:mhcclinic@awangrp.ca"
                    data-testid="footer-email-link"
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    mhcclinic@awangrp.ca
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Location</p>
                  <span className="text-white">200-1225 Maple Avenue</span>
                  <span className="text-slate-400 block text-sm">Milton, ON L9T 0A5</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Milton Health Centre. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              data-testid="scroll-to-top-btn"
              className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
