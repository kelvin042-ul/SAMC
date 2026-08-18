import { Phone, Mail, MapPin, Clock, Ambulance, Send } from 'lucide-react';

const Contact = () => {
    // Handle phone call
    const handlePhoneCall = (number) => {
        window.location.href = `tel:${number}`;
    };

    return (
        <section id="contact" className="py-20 px-6 max-w-7xl mx-auto w-full scroll-mt-24">
            {/* Section Header */}
            <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                    Get in Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                    Contact Us
                </h2>
                <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                    We're here to help. Reach out to us anytime.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Contact Info Cards */}
                <div className="space-y-6">
                    {/* Address */}
                    <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                            <MapPin size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Address</p>
                            <p className="text-gray-700 text-sm">123 Hospital Road, Victoria Island, Lagos, Nigeria</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                            <Phone size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone</p>
                            <button
                                onClick={() => handlePhoneCall('+2348000000000')}
                                className="text-gray-700 text-sm hover:text-blue-600 transition-colors block"
                            >
                                +234 800 000 0000
                            </button>
                            <button
                                onClick={() => handlePhoneCall('08012345678')}
                                className="text-red-600 text-sm font-bold hover:text-red-700 transition-colors block"
                            >
                                🚨 Emergency: 080-1234-5678
                            </button>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mail size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</p>
                            <a href="mailto:info@hospitalname.com" className="text-gray-700 text-sm hover:text-blue-600 transition-colors">
                                info@hospitalname.com
                            </a>
                            <p className="text-gray-400 text-xs mt-1">For appointments: appointments@hospitalname.com</p>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Working Hours</p>
                            <p className="text-gray-700 text-sm">Monday – Friday: 8:00 AM – 6:00 PM</p>
                            <p className="text-gray-500 text-sm">Saturday: 9:00 AM – 2:00 PM</p>
                            <p className="text-gray-500 text-sm">Sunday & Public Holidays: Closed</p>
                            <p className="text-red-500 text-sm font-bold mt-1">🚨 Emergency: 24/7</p>
                        </div>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="bg-white p-8 border border-gray-100 rounded-sm shadow-sm">
                    <h3 className="text-xl font-bold tracking-tight mb-6">Send a Message</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm"
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm resize-none"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all rounded-sm flex items-center justify-center gap-2"
                        >
                            <Send size={14} />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom: Emergency CTA */}
            <div className="mt-12 text-center bg-red-50 border border-red-100 rounded-sm p-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="flex items-center gap-3">
                        <Ambulance size={28} className="text-red-600 animate-pulse" />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-red-600">Emergency</p>
                            <p className="text-2xl font-bold text-red-600">080-1234-5678</p>
                        </div>
                    </div>
                    <span className="text-gray-400 hidden sm:block">|</span>
                    <p className="text-gray-600 text-sm">Available 24/7 – Call us immediately in case of emergency</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;