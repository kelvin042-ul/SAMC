import { Link } from 'react-router-dom';
import {
    Calendar,
    ChevronRight,
    Microscope,
    Stethoscope,
    Ambulance,
    Syringe,
    Eye,
    Droplets,
    Baby,
    Pill
} from 'lucide-react';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';

const Services = () => {
    // HARDCODED SERVICES
    const services = [
        {
            id: 1,
            title: 'Laboratory Services',
            icon: Microscope,
            description: 'State-of-the-art diagnostic laboratory offering comprehensive testing services including blood work, urinalysis, microbiology, and specialized screenings with rapid and accurate results.',
            image: 'https://images.pexels.com/photos/7088988/pexels-photo-7088988.jpeg?auto=compress&cs=tinysrgb&w=800',
            department: 'Diagnostics'
        },
        {
            id: 2,
            title: 'Antenatal Care',
            icon: Baby,
            description: 'Comprehensive pregnancy care from conception to delivery. Regular check-ups, ultrasound scans, nutritional guidance, and delivery support by experienced obstetricians.',
            image: 'https://images.pexels.com/photos/6945529/pexels-photo-6945529.jpeg?auto=compress&cs=tinysrgb&w=800',
            department: 'Maternity'
        },
        {
            id: 3,
            title: 'Medical Treatments',
            icon: Stethoscope,
            description: 'General medical consultations, chronic disease management, preventive care, and specialized treatment plans tailored to each patient\'s unique health needs.',
            image: 'https://images.pexels.com/photos/6589639/pexels-photo-6589639.jpeg?auto=compress&cs=tinysrgb&w=800',
            department: 'General Medicine'
        },
        {
            id: 4,
            title: 'Ambulance Services',
            icon: Ambulance,
            description: '24/7 emergency ambulance services with rapid response times, trained paramedics, and fully equipped vehicles to ensure you receive immediate medical attention when it matters most.',
            image: 'https://images.pexels.com/photos/7944056/pexels-photo-7944056.jpeg?auto=compress&cs=tinysrgb&w=800',
            department: 'Emergency'
        },
        {
            id: 5,
            title: 'Pharmacy Services',
            icon: Pill,
            description: 'Fully stocked in-house pharmacy with a wide range of prescription and over-the-counter medications. Our licensed pharmacists provide expert advice and medication management.',
            image: 'https://images.pexels.com/photos/7089017/pexels-photo-7089017.jpeg?auto=compress&cs=tinysrgb&w=800',
            department: 'Pharmacy'
        },
        {
            id: 6,
            title: 'Optician & Eye Care',
            icon: Eye,
            description: 'Comprehensive eye examinations, prescription glasses, contact lens fitting, and treatment for common eye conditions. Our optometrists use modern equipment for accurate diagnosis.',
            image: 'https://images.pexels.com/photos/6779061/pexels-photo-6779061.jpeg?auto=compress&cs=tinysrgb&w=800',
            department: 'Eye Care'
        },
        {
            id: 7,
            title: 'Dental Care',
            icon: Droplets,
            description: 'Full-service dental care including routine check-ups, cleanings, fillings, extractions, root canals, and cosmetic dentistry. Our dentists prioritize your comfort and oral health.',
            image: 'https://images.pexels.com/photos/7088968/pexels-photo-7088968.jpeg?auto=compress&cs=tinysrgb&w=800',
            department: 'Dentistry'
        },
        {
            id: 8,
            title: 'Immunization & Vaccination',
            icon: Syringe,
            description: 'Comprehensive immunization services for children and adults. We offer vaccines for all ages including childhood vaccines, travel vaccines, and seasonal flu shots.',
            image: 'https://images.pexels.com/photos/7089199/pexels-photo-7089199.jpeg?auto=compress&cs=tinysrgb&w=800',
            department: 'Preventive Care'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen pt-[104px]">
            {/* ============================================
                PAGE HEADER / HERO
                ============================================ */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-6 overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full blur-3xl hidden sm:block" />
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white rounded-full blur-3xl hidden sm:block" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-blue-200 font-bold">
                        Our Services
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-3 mb-4">
                        Comprehensive Healthcare Services
                    </h1>
                    <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
                        We offer a wide range of medical services designed to meet the healthcare needs of our community.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/book-appointment"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-50 transition-all rounded-full shadow-lg"
                        >
                            <Calendar size={14} />
                            Book Appointment
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================
                SERVICES GRID
                ============================================ */}
            <section className="py-20 px-6 max-w-7xl mx-auto w-full">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                        What We Offer
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                        Our Services
                    </h2>
                    <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                        Comprehensive healthcare services tailored to meet your needs
                    </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.id}
                                className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden h-48 bg-gray-100">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1587351021759-377ae7ae9942?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                    {/* Department Badge */}
                                    <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <span className="text-white text-[8px] font-bold uppercase tracking-widest">
                                            {service.department}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    {/* Icon + Title */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-all">
                                            <Icon size={18} className="text-blue-600" />
                                        </div>
                                        <h3 className="text-sm font-bold uppercase tracking-tight">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                        {service.description}
                                    </p>

                                    {/* Learn More / Book Link */}
                                    <Link
                                        to="/book-appointment"
                                        className="mt-4 inline-flex items-center gap-1 text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:gap-2 transition-all group/link"
                                    >
                                        Learn More
                                        <ChevronRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-500 text-sm mb-4">
                        Need a service not listed here? Contact us for more information.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all group"
                    >
                        Contact Us
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </section>

            {/* ============================================
                CTA SECTION
                ============================================ */}
            <CTASection />

            {/* ============================================
                FOOTER
                ============================================ */}
            <Footer />
        </div>
    );
};

export default Services;