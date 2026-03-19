import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/newsletter`, { email });
      setSubscribed(true);
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      if (error.response?.status === 400) {
        toast.error('This email is already subscribed.');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      data-testid="newsletter-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-slate-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
            <Mail size={28} className="text-white" />
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            Stay Informed About Your Health
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter for health tips, clinic updates, and the latest medical news delivered to your inbox.
          </p>

          {/* Newsletter Form */}
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-green-500/20 text-green-400 px-6 py-4 rounded-full"
            >
              <Check size={24} />
              <span className="font-medium">Thank you for subscribing!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} data-testid="newsletter-form" className="newsletter-input-group max-w-lg mx-auto">
              <div className="relative flex-grow">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="newsletter-email-input"
                  placeholder="Enter your email"
                  className="w-full h-14 pl-12 pr-4 rounded-full bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/15 focus:border-white/40"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                data-testid="newsletter-submit-btn"
                className="h-14 px-8 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-sm text-slate-400 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
