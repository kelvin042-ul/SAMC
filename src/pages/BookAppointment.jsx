import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Calendar,
    Clock,
    User,
    Phone,
    Mail,
    Stethoscope,
    ChevronDown,
    CheckCircle,
    AlertCircle,
    Loader2,
    ArrowLeft,
    FileText,
    CalendarDays
} from 'lucide-react';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import {
    fetchDoctors,
    getDoctorAppointmentsForDate,
    bookAppointment
} from '../services/bookingServices';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingData, setBookingData] = useState(null);

    // ============================================
    // CUSTOM DATE PICKER STATE
    // ============================================
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    // ============================================
    // FORM STATE
    // ============================================
    const [formData, setFormData] = useState({
        patientName: '',
        patientPhone: '',
        patientEmail: '',
        reason: '',
        doctorId: '',
        date: '',
        time: ''
    });
    // ============================================
    // CHECK IF PATIENT IS ALREADY LOGGED IN
    // ============================================
    const { currentUser } = useAuth();
    const isPatientLoggedIn = !!currentUser; // true if logged in

    // ============================================
    // DATA STATE
    // ============================================
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [bookedTimes, setBookedTimes] = useState([]);
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);

    // Refs for real-time listener
    const unsubscribeRef = useRef(null);

    // Doctor's available times (hardcoded fallback)
    const defaultTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

    // ============================================
    // GENERATE DATE OPTIONS
    // ============================================
    const getDays = () => {
        const days = [];
        for (let i = 1; i <= 31; i++) {
            days.push(i);
        }
        return days;
    };

    const getMonths = () => {
        return [
            { value: '01', label: 'January' },
            { value: '02', label: 'February' },
            { value: '03', label: 'March' },
            { value: '04', label: 'April' },
            { value: '05', label: 'May' },
            { value: '06', label: 'June' },
            { value: '07', label: 'July' },
            { value: '08', label: 'August' },
            { value: '09', label: 'September' },
            { value: '10', label: 'October' },
            { value: '11', label: 'November' },
            { value: '12', label: 'December' }
        ];
    };

    const getYears = () => {
        const years = [];
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i <= currentYear + 2; i++) {
            years.push(i);
        }
        return years;
    };

    const days = getDays();
    const months = getMonths();
    const years = getYears();

    // ============================================
    // BUILD DATE STRING FROM SELECTIONS
    // ============================================
    const buildDateString = () => {
        if (selectedDay && selectedMonth && selectedYear) {
            const day = String(selectedDay).padStart(2, '0');
            return `${selectedYear}-${selectedMonth}-${day}`;
        }
        return '';
    };

    // ============================================
    // UPDATE DATE WHEN SELECTIONS CHANGE
    // ============================================
    useEffect(() => {
        const dateString = buildDateString();
        setFormData(prev => ({ ...prev, date: dateString, time: '' }));
        setAvailableTimes([]);
        setBookedTimes([]);

        // Cleanup previous listener
        if (unsubscribeRef.current) {
            unsubscribeRef.current();
            unsubscribeRef.current = null;
        }

        if (dateString && formData.doctorId) {
            setupAvailabilityListener(formData.doctorId, dateString);
        }
    }, [selectedDay, selectedMonth, selectedYear]);

    // ============================================
    // FETCH ALL DOCTORS
    // ============================================
    useEffect(() => {
        const loadDoctors = async () => {
            setIsLoadingDoctors(true);
            const docs = await fetchDoctors();
            setDoctors(docs);
            setFilteredDoctors(docs);
            setIsLoadingDoctors(false);
        };
        loadDoctors();
    }, []);

    // ============================================
    // HANDLE DOCTOR SELECTION
    // ============================================
    const handleDoctorSelect = (doctorId) => {
        const doctor = doctors.find(d => d.id === doctorId);
        setSelectedDoctor(doctor);
        setFormData(prev => ({ ...prev, doctorId, time: '' }));
        setAvailableTimes([]);
        setBookedTimes([]);

        // Cleanup previous listener
        if (unsubscribeRef.current) {
            unsubscribeRef.current();
            unsubscribeRef.current = null;
        }

        // If date is selected, fetch availability
        if (formData.date && doctorId) {
            setupAvailabilityListener(doctorId, formData.date);
        }
    };

    // ============================================
    // SETUP REAL-TIME AVAILABILITY LISTENER
    // ============================================
    const setupAvailabilityListener = (doctorId, date) => {
        if (!doctorId || !date) return;

        // First, check if doctor is always available
        const checkDoctorAvailability = async () => {
            const doctor = doctors.find(d => d.id === doctorId);
            if (!doctor) return;

            // If doctor is always available, show all default times
            if (doctor.alwaysAvailable === true) {
                setAvailableTimes(defaultTimes);
                setBookedTimes([]);
                return;
            }

            // Otherwise, listen for booked times
            const unsubscribe = getDoctorAppointmentsForDate(doctorId, date, (bookedTimesArray) => {
                setBookedTimes(bookedTimesArray);

                // Get the doctor's available times
                const doctorTimes = doctor?.availableTimes || defaultTimes;

                // Filter out booked times
                const freeTimes = doctorTimes.filter(time => !bookedTimesArray.includes(time));
                setAvailableTimes(freeTimes);
            });

            unsubscribeRef.current = unsubscribe;
        };

        checkDoctorAvailability();
    };

    // ============================================
    // CLEANUP LISTENER ON UNMOUNT
    // ============================================
    useEffect(() => {
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, []);

    // ============================================
    // HANDLE FORM SUBMISSION
    // ============================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        if (!formData.patientName || !formData.patientPhone || !formData.patientEmail || !formData.doctorId || !formData.date || !formData.time || !formData.reason) {
            alert('Please fill in all required fields.');
            return;
        }

        setSubmitting(true);

        const doctor = doctors.find(d => d.id === formData.doctorId);

        const appointmentData = {
            patientName: formData.patientName,
            patientPhone: formData.patientPhone,
            patientEmail: formData.patientEmail,
            doctorId: formData.doctorId,
            doctorName: doctor?.name || '',
            doctorSpecialty: doctor?.specialty || '',
            date: formData.date,
            time: formData.time,
            reason: formData.reason,
            priority: 'normal',
            status: 'pending',
            bookingType: 'online',
            userId: null,
            createdAt: new Date()
        };

        const result = await bookAppointment(appointmentData);

        setSubmitting(false);

        if (result.success) {
            setBookingSuccess(true);
            setBookingData({ ...appointmentData, id: result.id });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert('Booking failed: ' + result.error);
        }
    };

    // ============================================
    // HANDLE "LOGIN TO TRACK" POPUP
    // ============================================
    const handleLoginRedirect = () => {
        navigate('/customer-login', { state: { from: '/book-appointment' } });
    };

    const handleContinueAsGuest = () => {
        navigate('/');
    };

    // ============================================
    // RENDER: SUCCESS STATE
    // ============================================
    if (bookingSuccess && bookingData) {
        return (
            <div className="flex flex-col min-h-screen pt-[104px]">
                <div className="flex-1 flex items-center justify-center px-6 py-20">
                    <div className="max-w-2xl w-full bg-white border border-gray-100 rounded-sm shadow-lg p-8 md:p-12 text-center">
                        {/* Success Icon */}
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-green-600" />
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight mb-2">Booking Successful! 🎉</h1>
                        <p className="text-gray-500 text-sm mb-6">
                            Your appointment has been booked successfully. You will receive a confirmation on WhatsApp.
                        </p>

                        {/* Booking Summary */}
                        <div className="bg-gray-50 p-6 rounded-sm text-left mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Patient</p>
                                    <p className="font-medium">{bookingData.patientName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Phone</p>
                                    <p className="font-medium">{bookingData.patientPhone}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Doctor</p>
                                    <p className="font-medium">{bookingData.doctorName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Date & Time</p>
                                    <p className="font-medium">{bookingData.date} • {bookingData.time}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Reason</p>
                                    <p className="font-medium text-sm">{bookingData.reason}</p>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Button */}
                        <div className="mb-6">
                            <a
                                href={`https://wa.me/${bookingData.patientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                    `🏥 SAMC Hospital - Appointment Confirmation\n\nHello ${bookingData.patientName},\n\nYour appointment has been BOOKED!\n\n📅 Date: ${bookingData.date}\n⏰ Time: ${bookingData.time}\n👨‍⚕️ Doctor: ${bookingData.doctorName}\n📋 Reason: ${bookingData.reason}\n\nThank you for choosing SAMC! ❤️`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#1DA851] transition-all rounded-full shadow-lg"
                            >
                                Get Confirmation on WhatsApp
                            </a>
                        </div>

                        {/* ============================================
                        LOGIN POPUP - ONLY SHOW IF PATIENT IS NOT LOGGED IN
                        ============================================ */}
                        {!isPatientLoggedIn ? (
                            <div className="bg-blue-50 border border-blue-100 rounded-sm p-6">
                                <p className="text-blue-700 text-sm font-medium mb-3">
                                    🔐 Create an account to track your booking status and view all your appointments.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <button
                                        onClick={() => navigate('/customer-login', { state: { from: '/book-appointment' } })}
                                        className="px-6 py-2.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all rounded-full"
                                    >
                                        Yes, Login
                                    </button>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="px-6 py-2.5 border border-gray-300 text-gray-600 text-[10px] font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all rounded-full"
                                    >
                                        No, Continue as Guest
                                    </button>
                                </div>
                                <p className="text-[9px] text-gray-400 mt-3">
                                    "Booking successfully sent, wait for the doctor's feedback"
                                </p>
                            </div>
                        ) : (
                            // ✅ If patient is already logged in, show this instead
                            <div className="bg-green-50 border border-green-100 rounded-sm p-6">
                                <p className="text-green-700 text-sm font-medium">
                                    ✅ You are logged in as <strong>{currentUser?.email}</strong>
                                </p>
                                <p className="text-green-600 text-sm mt-1">
                                    Your booking has been saved to your account. View it in "My Appointments".
                                </p>
                                <Link
                                    to="/my-account"
                                    className="inline-block mt-4 px-6 py-2.5 bg-green-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-green-700 transition-all rounded-full"
                                >
                                    View My Appointments
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <CTASection />
                <Footer />
            </div>
        );
    }
    // ============================================
    // RENDER: BOOKING FORM
    // ============================================
    const doctor = doctors.find(d => d.id === formData.doctorId);
    const today = new Date();

    return (
        <div className="flex flex-col min-h-screen pt-[60px]">
            {/* PAGE HEADER */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold mb-4"
                    >
                        <ArrowLeft size={14} />
                        Back to Home
                    </Link>
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.5em] text-blue-200 font-bold">
                            Book Appointment
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                            Schedule Your Visit
                        </h1>
                        <p className="text-blue-100 text-sm mt-2 max-w-lg">
                            Fill in the details below to book an appointment with one of our healthcare professionals.
                        </p>
                    </div>
                </div>
            </section>

            {/* BOOKING FORM */}
            <section className="py-12 px-6 max-w-4xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-sm shadow-sm p-6 md:p-10">
                    {/* STEP 1: Select Doctor */}
                    <div className="mb-8">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                            Step 1: Select Doctor *
                        </label>
                        <div className="relative">
                            <Stethoscope size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                value={formData.doctorId}
                                onChange={(e) => handleDoctorSelect(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm appearance-none bg-white"
                                disabled={isLoadingDoctors}
                            >
                                <option value="">Select a doctor...</option>
                                {filteredDoctors.map((doc) => (
                                    <option key={doc.id} value={doc.id}>
                                        {doc.name} {doc.specialty ? `- ${doc.specialty}` : ''}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        {selectedDoctor && (
                            <p className="text-xs text-gray-500 mt-2">{selectedDoctor.bio}</p>
                        )}
                    </div>

                    {/* STEP 2: Select Date (Custom Dropdown) */}
                    <div className="mb-8">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                            Step 2: Select Date *
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {/* Day Dropdown */}
                            <div className="relative">
                                <select
                                    value={selectedDay}
                                    onChange={(e) => setSelectedDay(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm appearance-none bg-white"
                                    disabled={!formData.doctorId}
                                >
                                    <option value="">Day</option>
                                    {days.map((day) => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Month Dropdown */}
                            <div className="relative">
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm appearance-none bg-white"
                                    disabled={!formData.doctorId}
                                >
                                    <option value="">Month</option>
                                    {months.map((month) => (
                                        <option key={month.value} value={month.value}>{month.label}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Year Dropdown */}
                            <div className="relative">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm appearance-none bg-white"
                                    disabled={!formData.doctorId}
                                >
                                    <option value="">Year</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        {!formData.doctorId && (
                            <p className="text-xs text-gray-400 mt-2">Please select a doctor first.</p>
                        )}
                        {formData.date && (
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                <CheckCircle size={12} />
                                Selected: {formData.date}
                            </p>
                        )}
                    </div>

                    {/* STEP 3: Select Time */}
                    <div className="mb-8">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                            Step 3: Select Time *
                        </label>
                        {!formData.date || !formData.doctorId ? (
                            <p className="text-sm text-gray-400">Please select a doctor and date first.</p>
                        ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {availableTimes.length > 0 ? (
                                    availableTimes.map((time) => (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, time }))}
                                            className={`py-2.5 px-3 text-xs font-medium rounded-sm border transition-all ${formData.time === time
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-600 hover:text-blue-600'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-sm text-red-500 col-span-full">
                                        No available slots for this date. Please select another date.
                                    </p>
                                )}
                            </div>
                        )}
                        {formData.time && (
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                <CheckCircle size={12} />
                                Selected: {formData.time}
                            </p>
                        )}
                    </div>

                    {/* STEP 4: Patient Details */}
                    <div className="mb-8">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                            Step 4: Your Details *
                        </label>
                        <div className="space-y-4">
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Full Name *"
                                    value={formData.patientName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm"
                                />
                            </div>
                            <div className="relative">
                                <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="tel"
                                    placeholder="Phone Number *"
                                    value={formData.patientPhone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, patientPhone: e.target.value }))}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm"
                                />
                            </div>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    value={formData.patientEmail}
                                    onChange={(e) => setFormData(prev => ({ ...prev, patientEmail: e.target.value }))}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm"
                                />
                            </div>
                            <div className="relative">
                                <FileText size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <textarea
                                    placeholder="Reason for Visit * (e.g., Chest pain, Routine checkup, etc.)"
                                    value={formData.reason}
                                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                                    rows="3"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm outline-none focus:border-blue-600 transition-all text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-gray-50 p-4 md:p-6 rounded-sm mb-8">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Booking Summary</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-[8px] uppercase tracking-widest text-gray-400">Patient</p>
                                <p className="font-medium">{formData.patientName || 'Not filled'}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-widest text-gray-400">Doctor</p>
                                <p className="font-medium">{doctor?.name || 'Not selected'}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-widest text-gray-400">Date</p>
                                <p className="font-medium">{formData.date || 'Not selected'}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-widest text-gray-400">Time</p>
                                <p className="font-medium">{formData.time || 'Not selected'}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[8px] uppercase tracking-widest text-gray-400">Reason</p>
                                <p className="font-medium text-sm">{formData.reason || 'Not filled'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting || !formData.doctorId || !formData.date || !formData.time || !formData.patientName || !formData.patientPhone || !formData.patientEmail || !formData.reason}
                        className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all rounded-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Booking...
                            </>
                        ) : (
                            <>
                                <Calendar size={16} />
                                Confirm Booking
                            </>
                        )}
                    </button>
                </form>
            </section>
            <Footer />
        </div>
    );
};

export default BookAppointment;