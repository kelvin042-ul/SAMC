import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section id="about" className="py-20 px-6 max-w-7xl mx-auto w-full">
            <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                    About Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                    Committed to Your Health
                </h2>
                <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                    Learn more about our hospital and our mission
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Image */}
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
                    {/* Small floating badge */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-sm shadow-lg">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                            Since 2010
                        </p>
                    </div>
                </div>

                {/* Right: Text Content */}
                <div className="space-y-5">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Founded in 2010, <span className="font-bold">[Hospital Name]</span> began with a simple mission:
                        to provide accessible, compassionate, and quality healthcare to every person
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

                    {/* Quick stats mini */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                        <div className="text-center">
                            <p className="text-xl font-bold text-blue-600">15+</p>
                            <p className="text-[8px] uppercase tracking-widest text-gray-400">Years</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-blue-600">50+</p>
                            <p className="text-[8px] uppercase tracking-widest text-gray-400">Staff</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-blue-600">10K+</p>
                            <p className="text-[8px] uppercase tracking-widest text-gray-400">Patients</p>
                        </div>
                    </div>

                    {/* Read More Link */}
                    <div className="pt-2">
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all group"
                        >
                            Read More About Us
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;