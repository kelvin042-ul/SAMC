import { Link } from 'react-router-dom';
import {
    MapPin,
    Phone,
    Clock,
    Navigation,
    ArrowLeft,
    Ambulance,
    Mail,
    ExternalLink
} from 'lucide-react';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';

const Location = () => {
    // Hospital details
    const hospital = {
        name: '[Hospital Name]',
        address: '123 Hospital Road, Victoria Island, Lagos, Nigeria',
        phone: '+234 800 000 0000',
        emergency: '080-1234-5678',
        email: 'info@hospitalname.com',
        hours: {
            weekdays: '8:00 AM – 6:00 PM',
            saturday: '9:00 AM – 2:00 PM',
            sunday: 'Closed (Emergency: 24/7)'
        },
        // Google Maps embed URL (replace with your actual embed)
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0!2d3.4!3d6.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjYnMzIuMCJOIDPCsDI0JzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1234567890',
        // Google Maps directions URL (replace with your actual coordinates)
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
        <div className="flex flex-col min-h-screen pt-[60px]">
            {/* ============================================
                PAGE HEADER
                ============================================ */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold mb-4"
                    >
                        <ArrowLeft size={14} />
                        Back to Home
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.5em] text-blue-200 font-bold">
                                Find Us
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                                How to Get Here
                            </h1>
                            <p className="text-blue-100 text-sm mt-2">
                                We are conveniently located for easy access
                            </p>
                        </div>

                        {/* Get Directions Button */}
                        <button
                            onClick={handleGetDirections}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-50 transition-all rounded-full shadow-lg"
                        >
                            <Navigation size={16} />
                            Get Directions
                        </button>
                    </div>
                </div>
            </section>

            {/* ============================================
                MAP SECTION
                ============================================ */}
            <section className="py-8 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-sm overflow-hidden shadow-lg border border-gray-100">
                        {/* Google Maps Embed - Full Width */}
                        <div className="relative w-full h-[500px] md:h-[600px]">
                            <iframe
                                src={hospital.mapEmbed}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="eager"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Hospital Location Map"
                                className="w-full h-full"
                            />
                        </div>

                        {/* Map Footer with Quick Actions */}
                        <div className="p-4 md:p-6 bg-white border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-blue-600" />
                                <span className="text-sm text-gray-700">
                                    {hospital.address}
                                </span>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleGetDirections}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all rounded-full"
                                >
                                    <Navigation size={14} />
                                    Directions
                                </button>
                                <button
                                    onClick={() => handlePhoneCall(hospital.emergency)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all rounded-full"
                                >
                                    <Phone size={14} />
                                    Emergency
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                LOCATION DETAILS
                ============================================ */}
            <section className="py-16 px-6 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Address Card */}
                    <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <MapPin size={22} className="text-blue-600" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-tight mb-2">Address</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {hospital.address}
                        </p>
                        <button
                            onClick={handleGetDirections}
                            className="mt-4 inline-flex items-center gap-2 text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:gap-3 transition-all"
                        >
                            Open in Google Maps
                            <ExternalLink size={12} />
                        </button>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <Phone size={22} className="text-blue-600" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-tight mb-2">Contact Us</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => handlePhoneCall(hospital.phone)}
                                className="block text-gray-600 text-sm hover:text-blue-600 transition-colors"
                            >
                                {hospital.phone}
                            </button>
                            <button
                                onClick={() => handlePhoneCall(hospital.emergency)}
                                className="block text-red-600 text-sm font-bold hover:text-red-700 transition-colors"
                            >
                                🚨 Emergency: {hospital.emergency}
                            </button>
                            <a
                                href={`mailto:${hospital.email}`}
                                className="block text-gray-600 text-sm hover:text-blue-600 transition-colors"
                            >
                                <Mail size={14} className="inline mr-2" />
                                {hospital.email}
                            </a>
                        </div>
                    </div>

                    {/* Hours Card */}
                    <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <Clock size={22} className="text-blue-600" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-tight mb-2">Opening Hours</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Monday – Friday</span>
                                <span className="text-gray-700 font-medium">{hospital.hours.weekdays}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Saturday</span>
                                <span className="text-gray-700 font-medium">{hospital.hours.saturday}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Sunday & Holidays</span>
                                <span className="text-gray-700 font-medium">{hospital.hours.sunday}</span>
                            </div>
                            <div className="pt-3 mt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-red-600 font-bold text-xs">
                                    <Ambulance size={14} />
                                    <span>Emergency: 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                DIRECTIONS / HOW TO GET THERE
                ============================================ */}
            <section className="py-16 px-6 bg-[#FDFCFB] border-y border-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                        Need Help Finding Us?
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mt-2 mb-6">
                        We're Here to Help You Get Here
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleGetDirections}
                            className="flex items-center gap-3 px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all rounded-full shadow-lg"
                        >
                            <Navigation size={16} />
                            Get Directions Now
                        </button>
                        <button
                            onClick={() => handlePhoneCall(hospital.phone)}
                            className="flex items-center gap-3 px-8 py-3 border border-gray-300 text-gray-700 text-[10px] font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all rounded-full"
                        >
                            <Phone size={16} />
                            Call Us for Help
                        </button>
                    </div>
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

export default Location;