# Milton Health Centre - Modern Parallax Website PRD

## Original Problem Statement
Build a modern parallax website for Milton Health Centre with:
- Modern clinical aesthetic (clean whites/subtle blues)
- Hyper-realistic medical imagery
- Key interactive features: animated service cards with hover effects, smooth parallax scrolling sections, interactive contact form, service filtering/search
- Services to highlight: Walk in Clinic, Family Practice Clinic, Travel Clinic, Aesthetic Clinic, Circumcision Clinic
- Live chat widget, Patient testimonials/reviews section, Blog/News section, Newsletter signup
- Stock imagery from Unsplash/Pexels

## User Personas
1. **Local Patients** - Milton, Ontario residents seeking primary healthcare
2. **Families** - Looking for family practice and pediatric care
3. **Travelers** - Need travel vaccinations and health consultations
4. **Aesthetic Clients** - Seeking cosmetic treatments
5. **New Parents** - Looking for circumcision services for newborns

## Core Requirements (Static)
- [x] Modern parallax hero section
- [x] Responsive navigation with mobile menu
- [x] Service cards with search/filter functionality
- [x] Individual service detail pages
- [x] Doctor/Team section with Dr. Saima Qureshi
- [x] Testimonials marquee section
- [x] Blog/News section with listing and detail pages
- [x] Contact form with toast notifications
- [x] Newsletter subscription
- [x] Live chat widget with AI responses
- [x] Footer with all navigation links
- [x] SEO-friendly meta tags

## What's Been Implemented (January 2026)
### Backend (FastAPI + MongoDB)
- `/api/services` - Service listing
- `/api/doctors` - Doctor profiles
- `/api/testimonials` - Testimonials data
- `/api/blog` - Blog listing
- `/api/blog/{slug}` - Single blog post
- `/api/contact` - Contact form submission
- `/api/newsletter` - Newsletter subscription
- `/api/chat` - Live chat with AI responses

### Frontend (React + Tailwind CSS + Framer Motion)
- Hero section with parallax effect (Lenis smooth scrolling)
- Bento grid services section with search
- Doctor bio section
- Testimonials marquee
- Blog preview section
- Contact form with Shadcn UI components
- Newsletter signup
- Live chat widget with real-time responses
- Responsive mobile navigation
- Custom fonts: Manrope, Public Sans, Libre Baskerville

## Architecture
```
Frontend: React 19 + Tailwind CSS + Framer Motion + Lenis
Backend: FastAPI + Motor (MongoDB async driver)
Database: MongoDB
Styling: Tailwind CSS + Custom CSS animations
UI Components: Shadcn/UI
```

## Prioritized Backlog
### P0 (Critical) - DONE
- [x] Core website functionality
- [x] All service pages
- [x] Contact and newsletter forms
- [x] Chat widget

### P1 (High Priority)
- [ ] Admin panel for content management
- [ ] Actual booking system integration (Ocean portal linked)
- [ ] Email notifications for contact form
- [ ] SEO optimization (sitemap, robots.txt)

### P2 (Medium Priority)
- [ ] Blog post management (CRUD)
- [ ] Testimonial management
- [ ] Analytics integration
- [ ] Multi-language support

### P3 (Nice to Have)
- [ ] Patient portal
- [ ] Online consultation booking
- [ ] Payment integration for aesthetic services

## Next Tasks
1. Add admin authentication and content management
2. Integrate email service for contact form notifications
3. Add SEO metadata and sitemap
4. Implement actual booking calendar integration
