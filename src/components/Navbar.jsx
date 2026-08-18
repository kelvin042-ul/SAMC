import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../data/firebaseConfig';
import { db } from '../data/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Menu, X, Search, User, ChevronRight, ChevronDown, CalendarPlus } from 'lucide-react';
import SearchPopup from './SearchPopup';
import TopNav from './TopNav';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [isMobileServicesExpanded, setIsMobileServicesExpanded] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownTimeout = useRef(null);

    // ============================================
    // HANDLE HASH LINK CLICKS (For scrolling to sections)
    // ============================================
    const handleHashLinkClick = (id, closeMenu = true) => {
        if (closeMenu) {
            setIsMenuOpen(false);
        }

        // If we're already on the home page
        if (location.pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to home page first
            navigate('/');
            // Wait for page to load, then scroll
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        }
    };

    // ============================================
    // CHECK IF USER IS A DOCTOR
    // ============================================
    const isDoctor = currentUser?.email === import.meta.env.VITE_ADMIN_EMAIL;

    // Fetch departments from Firestore (from doctors collection)
    const fetchDepartments = async () => {
        try {
            const snapshot = await getDocs(collection(db, "doctors"));
            const uniqueDepts = [...new Set(snapshot.docs.map(doc => doc.data().department))];
            setDepartments(uniqueDepts.filter(d => d && d.trim() !== ''));
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    // Fetch departments when component mounts
    useEffect(() => {
        fetchDepartments();
    }, []);

    // Refetch when services dropdown opens on desktop
    useEffect(() => {
        if (isServicesDropdownOpen) {
            fetchDepartments();
        }
    }, [isServicesDropdownOpen]);

    // Desktop dropdown hover handlers
    const handleMouseEnter = () => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setIsServicesDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeout.current = setTimeout(() => {
            setIsServicesDropdownOpen(false);
        }, 200);
    };

    // ============================================
    // PATIENT LOGOUT (Not doctor)
    // ============================================
    const handlePatientLogout = async () => {
        await logout();
        setIsUserDropdownOpen(false);
        navigate('/');
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    return (
        <>
            <TopNav />
            <nav className="fixed top-8 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* LEFT SECTION - Hamburger (Mobile only) */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="menu-button p-2 -ml-2 text-gray-900 hover:text-black transition-colors duration-200"
                                aria-label="Menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* CENTER SECTION - Logo */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none">
                            <Link
                                to="/"
                                className="text-2xl font-bold tracking-tighter text-gray-900 hover:text-black transition-colors duration-200"
                            >
                                SAMC Hospital
                            </Link>
                        </div>

                        {/* ============================================
                            DESKTOP NAV LINKS
                            ============================================ */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className="text-xs uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-all duration-200 hover:tracking-[0.2em]">
                                Home
                            </Link>

                            {/* Services with Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-xs uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-all duration-200 flex items-center gap-1">
                                    Services
                                    <ChevronDown size={12} className={`transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isServicesDropdownOpen && departments.length > 0 && (
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-sm z-50 animate-slide-down">
                                        <Link
                                            to="/services"
                                            onClick={() => setIsServicesDropdownOpen(false)}
                                            className="block px-4 py-3 text-[10px] uppercase tracking-widest font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors border-b border-gray-50"
                                        >
                                            All Services
                                        </Link>
                                        {departments.map(dept => (
                                            <Link
                                                key={dept}
                                                to={`/services?department=${encodeURIComponent(dept)}`}
                                                onClick={() => setIsServicesDropdownOpen(false)}
                                                className="block px-4 py-3 text-[10px] uppercase tracking-widest font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                            >
                                                {dept}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* About Us - Scrolls to #about on Home page */}
                            <button
                                onClick={() => handleHashLinkClick('about')}
                                className="text-xs uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-all duration-200"
                            >
                                About Us
                            </button>

                            {/* Contact - Scrolls to #contact on Home page */}
                            <button
                                onClick={() => handleHashLinkClick('contact')}
                                className="text-xs uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-all duration-200"
                            >
                                Contact
                            </button>

                            {/* Why Us - Scrolls to #why-us on Home page */}
                            <button
                                onClick={() => handleHashLinkClick('why-us')}
                                className="text-xs uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-all duration-200"
                            >
                                Why Us
                            </button>

                            {/* Find Doctor - Goes to /services page */}
                            <Link
                                to="/services"
                                className="text-xs uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-all duration-200"
                            >
                                Find Doctor
                            </Link>

                            {/* ============================================
                                DASHBOARD - Goes to Doctor Dashboard
                                ============================================ */}
                            <Link
                                to="/doctor-dashboard"
                                className="text-xs uppercase tracking-widest font-medium text-blue-600 hover:text-blue-800 transition-all duration-200"
                            >
                                Dashboard
                            </Link>

                            {/* BOOK APPOINTMENT BUTTON - Desktop */}
                            <Link
                                to="/book-appointment"
                                className="px-6 py-2.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                            >
                                Book Appointment
                            </Link>
                        </div>

                        {/* ============================================
                            RIGHT SECTION - Icons (PATIENT ONLY)
                            ============================================ */}
                        <div className="flex items-center space-x-4 sm:space-x-5">
                            {/* Search Icon */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-gray-700 hover:text-black transition-colors duration-200"
                                aria-label="Search"
                            >
                                <Search size={18} strokeWidth={1.5} />
                            </button>

                            {/* ============================================
                                PATIENT USER DROPDOWN (NOT FOR DOCTORS)
                                ============================================ */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                    className="text-gray-700 hover:text-black transition-colors duration-200"
                                    aria-label="Account"
                                >
                                    <User size={18} strokeWidth={1.5} />
                                </button>

                                {isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-sm z-50 animate-slide-down">
                                        {currentUser ? (
                                            <>
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-[10px] font-bold uppercase truncate">{currentUser.email}</p>
                                                    <p className="text-[8px] text-gray-400 mt-1">Logged in as Patient</p>
                                                </div>
                                                <Link
                                                    to="/my-account"
                                                    onClick={() => setIsUserDropdownOpen(false)}
                                                    className="block px-4 py-2 text-[10px] uppercase tracking-widest text-gray-700 hover:bg-gray-50"
                                                >
                                                    My Appointments
                                                </Link>
                                                <button
                                                    onClick={handlePatientLogout}
                                                    className="w-full text-left px-4 py-2 text-[10px] uppercase tracking-widest text-red-500 hover:bg-gray-50"
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    to="/customer-login"
                                                    onClick={() => setIsUserDropdownOpen(false)}
                                                    className="block px-4 py-2 text-[10px] uppercase tracking-widest text-gray-700 hover:bg-gray-50"
                                                >
                                                    Sign In
                                                </Link>
                                                <Link
                                                    to="/customer-signup"
                                                    onClick={() => setIsUserDropdownOpen(false)}
                                                    className="block px-4 py-2 text-[10px] uppercase tracking-widest text-gray-700 hover:bg-gray-50"
                                                >
                                                    Create Account
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Search Popup */}
            <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* ============================================
                MOBILE SLIDE MENU
                ============================================ */}
            <>
                {/* Dark Overlay */}
                <div
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Slide Menu Panel */}
                <div
                    className={`mobile-menu fixed top-0 left-0 h-full w-[70%] max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out md:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    {/* Menu Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Menu</span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 -mr-2 text-gray-500 hover:text-black transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Menu Links */}
                    <div className="flex-1 py-4 overflow-y-auto">
                        {/* Home */}
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-between px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-black transition-colors group"
                        >
                            <span className="uppercase tracking-wider">Home</span>
                            <ChevronRight size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                        </Link>

                        {/* Services */}
                        <div>
                            <button
                                onClick={() => {
                                    setIsMobileServicesExpanded(!isMobileServicesExpanded);
                                    fetchDepartments();
                                }}
                                className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors group"
                            >
                                <span className="uppercase tracking-wider">Services</span>
                                <ChevronRight
                                    size={16}
                                    className={`text-gray-400 transition-transform duration-200 ${isMobileServicesExpanded ? 'rotate-90' : ''}`}
                                />
                            </button>

                            {isMobileServicesExpanded && (
                                <div className="bg-gray-50/50 ml-4 pl-4 border-l-2 border-gray-100">
                                    <Link
                                        to="/services"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            setIsMobileServicesExpanded(false);
                                        }}
                                        className="block px-6 py-3 text-[11px] uppercase tracking-wider font-medium text-gray-600 hover:text-black transition-colors"
                                    >
                                        All Services
                                    </Link>
                                    {departments.map(dept => (
                                        <Link
                                            key={dept}
                                            to={`/services?department=${encodeURIComponent(dept)}`}
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                setIsMobileServicesExpanded(false);
                                            }}
                                            className="block px-6 py-3 text-[11px] uppercase tracking-wider font-medium text-gray-600 hover:text-black transition-colors"
                                        >
                                            {dept}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* About Us */}
                        <button
                            onClick={() => handleHashLinkClick('about')}
                            className="w-full flex items-center px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-black transition-colors group text-left"
                        >
                            <span className="uppercase tracking-wider">About Us</span>
                        </button>

                        {/* Contact */}
                        <button
                            onClick={() => handleHashLinkClick('contact')}
                            className="w-full flex items-center px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-black transition-colors group text-left"
                        >
                            <span className="uppercase tracking-wider">Contact</span>
                        </button>

                        {/* Why Us */}
                        <button
                            onClick={() => handleHashLinkClick('why-us')}
                            className="w-full flex items-center px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-black transition-colors group text-left"
                        >
                            <span className="uppercase tracking-wider">Why Us</span>
                        </button>

                        {/* Find Doctor */}
                        <Link
                            to="/services"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-black transition-colors group"
                        >
                            <span className="uppercase tracking-wider">Find Doctor</span>
                        </Link>

                        {/* Dashboard - Mobile */}
                        <Link
                            to="/doctor-dashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center px-6 py-4 text-sm font-medium text-blue-600 hover:bg-gray-50 transition-colors group"
                        >
                            <span className="uppercase tracking-wider">Dashboard</span>
                        </Link>
                    </div>

                    {/* BOOK APPOINTMENT BUTTON - Mobile (at the bottom) */}
                    <div className="p-6 border-t border-gray-100">
                        <Link
                            to="/book-appointment"
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg"
                        >
                            <CalendarPlus size={16} />
                            Book Appointment
                        </Link>
                    </div>
                </div>
            </>
        </>
    );
};

export default Navbar;