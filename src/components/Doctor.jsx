import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const Doctor = () => {
    // HARDCODED FOR NOW - Will be replaced with Firebase data later
    const doctors = [
        {
            id: 1,
            name: 'Dr. Chidi Okonkwo',
            specialty: 'Cardiologist',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
            bio: 'Expert in heart conditions with 15 years of experience.'
        },
        {
            id: 2,
            name: 'Dr. Adeola Ogunleye',
            specialty: 'Obstetrician & Gynecologist',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
            bio: 'Specializing in pregnancy care and women\'s health.'
        },
        {
            id: 3,
            name: 'Dr. Funmi Adebayo',
            specialty: 'Laboratory Scientist',
            image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
            bio: 'Leading our diagnostic laboratory with precision and care.'
        },
        {
            id: 4,
            name: 'Dr. Emeka Nwachukwu',
            specialty: 'Optician & Eye Care',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
            bio: 'Comprehensive eye care and vision correction specialist.'
        }
    ];

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto w-full bg-[#FDFCFB]">
            <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                    Meet Our Team
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                    Our Doctors
                </h2>
                <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                    Dedicated professionals committed to your health and well-being
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden h-64 bg-gray-100">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1587351021759-377ae7ae9942?auto=format&fit=crop&w=400&q=80';
                                }}
                            />
                            {/* Specialty badge */}
                            <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="text-white text-[8px] font-bold uppercase tracking-widest">
                                    {doctor.specialty}
                                </span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-5">
                            <h3 className="text-sm font-bold uppercase tracking-tight">
                                {doctor.name}
                            </h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                                {doctor.specialty}
                            </p>
                            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                {doctor.bio}
                            </p>

                            {/* Book Button */}
                            <Link
                                to="/book-appointment"
                                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-black text-white text-[9px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all rounded-sm"
                            >
                                <Calendar size={12} />
                                Book Appointment
                            </Link>
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
    );
};

export default Doctor;