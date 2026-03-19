import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import DoctorsSection from '../components/DoctorsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

const HomePage = () => {
  return (
    <div data-testid="home-page" className="relative">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <DoctorsSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default HomePage;
