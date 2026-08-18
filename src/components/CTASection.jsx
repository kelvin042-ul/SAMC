import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="py-16 bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Ready to Book an Appointment?
                </h2>
                <p className="text-white/70 text-sm max-w-md mx-auto mb-8">
                    Schedule a visit with one of our healthcare professionals today.
                </p>
                <Link
                    to="/book-appointment"
                    className="inline-block px-10 py-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                    Book Now
                </Link>
            </div>
        </section>
    );
};

export default CTASection;