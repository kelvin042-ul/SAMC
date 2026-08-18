import { Link } from 'react-router-dom';
import {
    Heart,
    Users,
    Award,
    Clock,
    Target,
    Eye,
    Shield,
    Handshake,
    Stethoscope,
    Microscope,
    Calendar,
    ChevronRight
} from 'lucide-react';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';

const AboutUs = () => {
    // Values data
    const values = [
        {
            id: 1,
            icon: Heart,
            title: 'Compassion',
            description: 'We treat every patient with kindness, empathy, and respect, understanding that healthcare is a personal journey.'
        },
        {
            id: 2,
            icon: Shield,
            title: 'Excellence',
            description: 'We strive for the highest standards in medical care, continuously improving our skills and services.'
        },
        {
            id: 3,
            icon: Handshake,
            title: 'Integrity',
            description: 'We are honest, transparent, and ethical in everything we do – from patient care to business practices.'
        },
        {
            id: 4,
            icon: Users,
            title: 'Teamwork',
            description: 'We work collaboratively across departments to ensure seamless, coordinated care for every patient.'
        }
    ];

    // Leadership team
    const leadership = [
        {
            id: 1,
            name: 'Dr. Chidi Okonkwo',
            role: 'Chief Medical Officer',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
            bio: '15+ years of experience in cardiology and hospital management.'
        },
        {
            id: 2,
            name: 'Dr. Adeola Ogunleye',
            role: 'Head of Obstetrics & Gynecology',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
            bio: 'Specializing in maternal health and high-risk pregnancies.'
        },
        {
            id: 3,
            name: 'Dr. Funmi Adebayo',
            role: 'Director of Laboratory Services',
            image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
            bio: 'Leading diagnostic innovation with precision and accuracy.'
        }
    ];

    // Stats (animated counters will be added later)
    const stats = [
        { icon: Heart, label: 'Happy Patients', value: 10000, suffix: '+' },
        { icon: Award, label: 'Years of Experience', value: 15, suffix: '+' },
        { icon: Users, label: 'Medical Staff', value: 50, suffix: '+' },
        { icon: Clock, label: 'Emergency Care', value: 24, suffix: '/7' }
    ];

    return (
        <div className="flex flex-col min-h-screen pt-[50px]">
            {/* ============================================
                PAGE HEADER / HERO
                ============================================ */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-6 overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-blue-200 font-bold">
                        About Us
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-3 mb-4">
                        Committed to Excellence in Healthcare
                    </h1>
                    <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
                        Since 2010, we have been dedicated to providing compassionate, high-quality healthcare
                        to our community. Your health is our priority.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link
                            to="/book-appointment"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-50 transition-all rounded-full shadow-lg"
                        >
                            <Calendar size={14} />
                            Book Appointment
                        </Link>
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/30 transition-all rounded-full border border-white/30"
                        >
                            View Our Services
                            <ChevronRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================
                SECTION 1: OUR STORY
                ============================================ */}
            <section className="py-20 px-6 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="relative rounded-sm overflow-hidden shadow-lg">
                        <img
                            src="https://images.pexels.com/photos/7944056/pexels-photo-7944056.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Hospital building"
                            className="w-full h-80 lg:h-[420px] object-cover"
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1587351021759-377ae7ae9942?auto=format&fit=crop&w=800&q=80';
                            }}
                        />
                        {/* Year badge */}
                        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-sm shadow-lg">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                Serving Since 2010
                            </p>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-5">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                                Our Story
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                                A Legacy of Care
                            </h2>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Founded in 2010, <span className="font-bold">[Hospital Name]</span> began with a simple
                            mission: to provide accessible, compassionate, and quality healthcare to every person
                            who walks through our doors.
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            What started as a small clinic with just 5 staff members has grown into a
                            full-service hospital serving thousands of patients annually. We are proud
                            to be a trusted healthcare provider in our community.
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Our commitment to excellence drives everything we do – from the quality of
                            our medical care to the comfort of our facilities. We believe that every
                            patient deserves personalized attention and the highest standard of medical
                            care, delivered with compassion and respect.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                                <Heart size={14} className="text-blue-600" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                    Patient-Centered
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                                <Stethoscope size={14} className="text-blue-600" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                    Expert Care
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                                <Microscope size={14} className="text-blue-600" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                    Modern Technology
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                SECTION 2: MISSION & VISION
                ============================================ */}
            <section className="py-20 px-6 bg-[#FDFCFB]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                            Our Purpose
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                            Mission & Vision
                        </h2>
                        <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                            Guiding our commitment to exceptional healthcare
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission Card */}
                        <div className="bg-white p-8 md:p-10 border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-all">
                            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                                <Target size={28} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight mb-3">Our Mission</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                To deliver compassionate, high-quality healthcare that improves the health
                                and well-being of our community through excellence in medical care,
                                education, and service.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-white p-8 md:p-10 border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-all">
                            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                                <Eye size={28} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight mb-3">Our Vision</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                To be the leading healthcare provider in the region, recognized for our
                                commitment to patient-centered care, medical innovation, and community health.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                SECTION 3: OUR VALUES
                ============================================ */}
            <section className="py-20 px-6 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                        What We Stand For
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                        Our Core Values
                    </h2>
                    <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                        These principles guide everything we do
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value) => {
                        const Icon = value.icon;
                        return (
                            <div
                                key={value.id}
                                className="bg-white p-6 border border-gray-100 rounded-sm text-center hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-all">
                                    <Icon size={28} className="text-blue-600" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-tight mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ============================================
                SECTION 4: STATS / ACHIEVEMENTS
                ============================================ */}
            <section className="py-16 px-6 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                            Our Impact
                        </span>
                        <h2 className="text-3xl font-bold tracking-tighter mt-2">
                            By the Numbers
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="text-center">
                                    <div className="flex justify-center mb-3">
                                        <Icon size={28} className="text-blue-600" />
                                    </div>
                                    <p className="text-3xl md:text-4xl font-bold tracking-tight">
                                        {stat.value.toLocaleString()}{stat.suffix}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">
                                        {stat.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================
                SECTION 5: MEET OUR LEADERSHIP
                ============================================ */}
            <section className="py-20 px-6 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                        Our Leaders
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                        Meet Our Leadership Team
                    </h2>
                    <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                        Dedicated professionals leading our commitment to excellence
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {leadership.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                        >
                            <div className="relative overflow-hidden h-62 bg-gray-100">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1587351021759-377ae7ae9942?auto=format&fit=crop&w=400&q=80';
                                    }}
                                />
                                {/* Role badge */}
                                <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <span className="text-white text-[8px] font-bold uppercase tracking-widest">
                                        {member.role}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-sm font-bold uppercase tracking-tight">
                                    {member.name}
                                </h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                                    {member.role}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Doctors Link */}
                <div className="text-center mt-10">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all group"
                    >
                        View All Our Doctors
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

export default AboutUs;