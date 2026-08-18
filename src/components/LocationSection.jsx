import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';

const LocationSection = () => {
    // Hospital details
    const hospital = {
        address: '123 Hospital Road, Victoria Island, Lagos, Nigeria',
        phone: '+234 800 000 0000',
        emergency: '080-1234-5678',
        directionsUrl: 'https://www.google.com/maps/dir//123+Hospital+Road+Victoria+Island+Lagos'
    };

    // Handle Get Directions - opens Google Maps in new tab
    const handleGetDirections = () => {
        window.open(hospital.directionsUrl, '_blank');
    };

    // Handle phone call
    const handlePhoneCall = (number) => {
        window.location.href = `tel:${number}`;
    };

    return (
        <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-blue-200 font-bold">
                        Find Us
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                        How to Get Here
                    </h2>
                    <p className="text-blue-100 text-sm mt-3 max-w-md mx-auto">
                        We are conveniently located for easy access
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Google Maps (Takes 2/3 of the space) */}
                    <div className="lg:col-span-2 bg-gray-200 rounded-sm overflow-hidden shadow-xl h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0!2d3.4!3d6.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjYnMzIuMCJOIDPCsDI0JzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Hospital Location"
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    {/* Right: Details (Takes 1/3 of the space) */}
                    <div className="space-y-6 flex flex-col justify-center bg-white/10 backdrop-blur-sm rounded-sm p-6">
                        <div>
                            <h3 className="text-lg font-bold tracking-tight text-white mb-2">
                                Visit Our Hospital
                            </h3>
                            <p className="text-blue-100 text-sm">
                                We are conveniently located for easy access.
                            </p>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-blue-200 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
                                    Address
                                </p>
                                <p className="text-white text-sm">
                                    {hospital.address}
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-3">
                            <Phone size={18} className="text-blue-200 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
                                    Call Us
                                </p>
                                <button
                                    onClick={() => handlePhoneCall(hospital.phone)}
                                    className="text-white text-sm hover:text-blue-200 transition-colors"
                                >
                                    {hospital.phone}
                                </button>
                                <button
                                    onClick={() => handlePhoneCall(hospital.emergency)}
                                    className="text-red-200 text-sm font-bold block hover:text-red-100 transition-colors"
                                >
                                    Emergency: {hospital.emergency}
                                </button>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="flex items-start gap-3">
                            <Clock size={18} className="text-blue-200 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
                                    Opening Hours
                                </p>
                                <p className="text-white text-sm">Mon–Fri: 8:00 AM – 6:00 PM</p>
                                <p className="text-blue-100 text-sm">Sat: 9:00 AM – 2:00 PM</p>
                                <p className="text-red-200 text-sm font-bold mt-1">Emergency: 24/7</p>
                            </div>
                        </div>

                        {/* Directions Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/20">
                            {/* Get Directions - Opens Google Maps in new tab */}
                            <button
                                onClick={handleGetDirections}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-50 transition-all rounded-full"
                            >
                                <Navigation size={14} />
                                Get Directions
                            </button>

                            {/* View Full Map - Navigates to /location page */}
                            <Link
                                to="/location"
                                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/30 transition-all rounded-full border border-white/30"
                            >
                                <ExternalLink size={14} />
                                View Full Map
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;