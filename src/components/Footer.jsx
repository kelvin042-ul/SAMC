import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#111] text-white pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Identity */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold tracking-tighter">AURA HOME</h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Redefining the modern lifestyle through curated essentials for your home, your wardrobe, and your journey.
                        </p>
                        <div className="flex gap-4">
                            <Instagram size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
                            <Twitter size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
                            <Facebook size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Navigation</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/shop" className="hover:text-brandPurple transition-colors">Shop All Collections</Link></li>
                            <li><Link to="/shop" className="hover:text-brandPurple transition-colors">New Arrivals</Link></li>
                            <li><Link to="/shop" className="hover:text-brandPurple transition-colors">Best Sellers</Link></li>
                            <li><Link to="/login" className="hover:text-brandPurple transition-colors">Admin Portal</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Customer Care</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="hover:text-brandPurple cursor-pointer">Shipping & Returns</li>
                            <li className="hover:text-brandPurple cursor-pointer">Terms of Service</li>
                            <li className="hover:text-brandPurple cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-brandPurple cursor-pointer">Order Tracking</li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Get In Touch</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center gap-3"><Mail size={16} /> support@aurahome.com</li>
                            <li className="flex items-center gap-3"><Phone size={16} /> +234 800 000 0000</li>
                            <li className="flex items-center gap-3"><MapPin size={16} /> Victoria Island, Lagos</li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter & Bottom Bar */}
                <div className="border-t border-white/10 pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                            © 2026 AURA HOME ENTERPRISE. ALL RIGHTS RESERVED.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="h-[1px] w-8 bg-gray-700"></div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Designed for Excellence</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;