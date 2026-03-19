import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDoctor: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const services = [
    'Walk-in Clinic',
    'Family Practice',
    'Travel Clinic',
    'Aesthetic Clinic',
    'Circumcision Clinic',
    'General Inquiry'
  ];

  const doctors = [
    'Dr. Shazia Latif',
    'Dr. Meena Hussain',
    'Dr. Arieg Badawi',
    'Dr. Saima Qureshi',
    'No Preference'
  ];

  // Listen for doctor selection from other components
  useEffect(() => {
    const handleDoctorSelect = (event) => {
      const doctorName = event.detail?.doctorName;
      if (doctorName) {
        setFormData(prev => ({ 
          ...prev, 
          preferredDoctor: doctorName,
          message: prev.message || `I would like to book an appointment with ${doctorName}.`
        }));
      }
    };

    window.addEventListener('selectDoctor', handleDoctorSelect);
    return () => window.removeEventListener('selectDoctor', handleDoctorSelect);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', service: '', preferredDoctor: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section 
      id="contact" 
      data-testid="contact-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#FAFAF9]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium tracking-wide text-slate-500 uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6">
              We're Here to Help
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Have questions about our services? Need to schedule an appointment? 
              Reach out to us and our friendly staff will assist you.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Phone size={22} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                  <a 
                    href="tel:+19056936400" 
                    data-testid="contact-phone-link"
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    905-693-6400
                  </a>
                  <p className="text-sm text-slate-500 mt-1">Fax: 905-693-6405</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                  <a 
                    href="mailto:mhcclinic@awangrp.ca"
                    data-testid="contact-email-link"
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    mhcclinic@awangrp.ca
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
                  <p className="text-slate-600">200-1225 Maple Avenue</p>
                  <p className="text-slate-600">Milton, Ontario L9T 0A5</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Clock size={22} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Hours</h3>
                  <p className="text-slate-600">Mon-Fri: 9:00AM - 6:00PM</p>
                  <p className="text-slate-600">Saturday: 10:00AM - 4:00PM</p>
                  <p className="text-slate-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form 
              onSubmit={handleSubmit}
              data-testid="contact-form"
              className="contact-form bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Send Us a Message</h3>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-testid="contact-name-input"
                    placeholder="John Doe"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      data-testid="contact-email-input"
                      placeholder="john@example.com"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      data-testid="contact-phone-input"
                      placeholder="(905) 555-0123"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                    Service of Interest
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
                  >
                    <SelectTrigger data-testid="contact-service-select" className="h-12 rounded-xl">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="preferredDoctor" className="block text-sm font-medium text-slate-700 mb-2">
                    Preferred Doctor
                  </label>
                  <Select
                    value={formData.preferredDoctor}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, preferredDoctor: value }))}
                  >
                    <SelectTrigger data-testid="contact-doctor-select" className="h-12 rounded-xl">
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor} value={doctor}>
                          {doctor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    data-testid="contact-message-input"
                    placeholder="How can we help you?"
                    rows={5}
                    className="rounded-xl resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="contact-submit-btn"
                  className="w-full btn-primary inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-8 py-4 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
