import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle, Stethoscope } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const scrollToContact = (doctorName) => {
  // Dispatch custom event with doctor name
  if (doctorName) {
    window.dispatchEvent(new CustomEvent('selectDoctor', { 
      detail: { doctorName } 
    }));
  }
  
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/doctors`);
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Fallback data - actual doctors from Milton Health Centre
        setDoctors([
          {
            id: 'dr-saima-qureshi',
            name: 'Dr. Saima Qureshi',
            title: 'Family Physician & Medical Director',
            bio: 'Dr. Saima Qureshi is the founder and Medical Director of Milton Health Centre. She is currently accepting new patients and is dedicated to providing compassionate, patient-centered care to the Milton community.',
            specialties: ['Family Practice', 'Walk-in Clinic', "Women's Health", 'Chronic Disease Management'],
            education: 'MD, CCFP',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
            acceptingPatients: true
          },
          {
            id: 'dr-shazia-latif',
            name: 'Dr. Shazia Latif',
            title: 'Family Physician',
            bio: 'Dr. Shazia Latif is a dedicated family physician at Milton Health Centre with extensive experience in comprehensive primary care. She provides compassionate, patient-centered care for families in the Milton community.',
            specialties: ['Family Practice', 'Walk-in Clinic', 'Preventive Care', 'Chronic Disease Management'],
            education: 'MD, CCFP, FCFP',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
            acceptingPatients: false
          },
          {
            id: 'dr-arieg-badawi',
            name: 'Dr. Arieg Badawi',
            title: 'Family Physician',
            bio: 'Dr. Arieg Badawi is a skilled family physician dedicated to delivering comprehensive medical care. She focuses on preventive health and treats patients of all ages at Milton Health Centre.',
            specialties: ['Family Practice', 'Walk-in Clinic', 'Preventive Medicine', 'Health Screenings'],
            education: 'MD, CCFP',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
            acceptingPatients: false
          },
          {
            id: 'dr-meena-hussain',
            name: 'Dr. Meena Hussain',
            title: 'Family Physician',
            bio: 'Dr. Meena Hussain brings expertise in family medicine to Milton Health Centre. She is committed to providing high-quality healthcare services and building lasting relationships with her patients.',
            specialties: ['Family Practice', 'Walk-in Clinic', "Women's Health", 'Pediatric Care'],
            education: 'MD, CCFP',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
            acceptingPatients: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section 
      id="doctors" 
      data-testid="doctors-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-slate-50"
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
            Meet Our Team
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6">
            Expert Medical Professionals
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our dedicated team of healthcare professionals is committed to providing you with the highest quality care.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Doctor Image */}
                  <div className="relative sm:w-2/5 h-56 sm:h-auto">
                    <img 
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                    {doctor.acceptingPatients && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        Accepting Patients
                      </div>
                    )}
                  </div>

                  {/* Doctor Info */}
                  <div className="sm:w-3/5 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{doctor.name}</h3>
                          <p className="text-blue-600 font-medium text-sm">{doctor.title}</p>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <Stethoscope size={18} className="text-slate-600" />
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-3">
                        {doctor.bio}
                      </p>

                      {/* Education */}
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap size={14} className="text-slate-400" />
                        <span className="text-xs text-slate-600 font-medium">{doctor.education}</span>
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {doctor.specialties.slice(0, 2).map((specialty, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-700"
                          >
                            <CheckCircle size={10} className="text-green-500" />
                            {specialty}
                          </span>
                        ))}
                        {doctor.specialties.length > 2 && (
                          <span className="px-2 py-1 text-xs text-slate-500">
                            +{doctor.specialties.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => scrollToContact(doctor.name)}
                      data-testid={`book-with-${doctor.id}`}
                      className="w-full btn-primary inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2.5 font-semibold text-sm shadow-lg hover:bg-slate-800 transition-all"
                    >
                      Book with Dr. {doctor.name.split(' ').pop()}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;
