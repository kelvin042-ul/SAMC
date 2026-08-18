import { useState } from 'react';
import { db, auth } from '../../data/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { User, Mail, Stethoscope, Briefcase, Clock, Loader2, CheckCircle, Phone, ToggleLeft, ToggleRight } from 'lucide-react';

const DoctorProfileForm = ({ onProfileComplete }) => {
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        department: 'General',
        phone: '',
        email: auth.currentUser?.email || '',
        // ✅ NEW: Always available toggle
        alwaysAvailable: true,  // Default: always available
        availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Toggle always available
    const toggleAlwaysAvailable = () => {
        setFormData(prev => ({
            ...prev,
            alwaysAvailable: !prev.alwaysAvailable
        }));
    };

    // Toggle time selection
    const toggleTime = (time) => {
        setFormData(prev => {
            if (prev.availableTimes.includes(time)) {
                return {
                    ...prev,
                    availableTimes: prev.availableTimes.filter(t => t !== time)
                };
            } else {
                return {
                    ...prev,
                    availableTimes: [...prev.availableTimes, time]
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // If always available is true, we don't need to save specific times
            const dataToSave = {
                ...formData,
                uid: auth.currentUser?.uid,
                isAvailable: true,
                createdAt: new Date()
            };

            // If always available, clear the specific times
            if (formData.alwaysAvailable) {
                dataToSave.availableTimes = []; // No specific times needed
            }

            await addDoc(collection(db, "doctors"), dataToSave);
            setSuccess(true);
            setTimeout(() => onProfileComplete(), 2000);
        } catch (err) {
            console.error("Error saving profile:", err);
            setError('Failed to save profile. Please try again.');
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] px-4 pt-[104px]">
                <div className="max-w-md w-full bg-white p-10 shadow-2xl rounded-sm text-center border-t-4 border-green-600">
                    <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Profile Created! ✅</h2>
                    <p className="text-gray-500 text-sm">Your profile has been saved. Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] px-4 pt-[104px] pb-12">
            <div className="max-w-2xl w-full bg-white p-8 shadow-2xl rounded-sm border-t-4 border-blue-600">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tighter mb-2">Complete Your Profile</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">Set up your doctor profile</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-sm">
                        <p className="text-red-500 text-xs text-center">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="relative border-b border-gray-100 pb-2">
                        <User className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type="text"
                            placeholder="Full Name *"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 pl-8 outline-none focus:border-black transition-colors text-sm bg-transparent"
                        />
                    </div>

                    {/* Specialty */}
                    <div className="relative border-b border-gray-100 pb-2">
                        <Stethoscope className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type="text"
                            placeholder="Specialty (e.g., General Practitioner) *"
                            required
                            value={formData.specialty}
                            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                            className="w-full p-3 pl-8 outline-none focus:border-black transition-colors text-sm bg-transparent"
                        />
                    </div>

                    {/* Department */}
                    <div className="relative border-b border-gray-100 pb-2">
                        <Briefcase className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type="text"
                            placeholder="Department"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            className="w-full p-3 pl-8 outline-none focus:border-black transition-colors text-sm bg-transparent"
                        />
                    </div>

                    {/* Phone */}
                    <div className="relative border-b border-gray-100 pb-2">
                        <Phone className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-3 pl-8 outline-none focus:border-black transition-colors text-sm bg-transparent"
                        />
                    </div>

                    {/* Email (auto-filled, disabled) */}
                    <div className="relative">
                        <Mail className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            disabled
                            className="w-full p-3 pl-8 outline-none text-sm bg-gray-50 cursor-not-allowed"
                        />
                    </div>

                    {/* ============================================
                        AVAILABILITY SETTINGS
                        ============================================ */}
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                            Availability Settings
                        </label>

                        {/* Always Available Toggle */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-sm border border-gray-100 mb-4">
                            <div>
                                <p className="text-sm font-medium">Always Available</p>
                                <p className="text-[10px] text-gray-400">Patients can book any time</p>
                            </div>
                            <button
                                type="button"
                                onClick={toggleAlwaysAvailable}
                                className={`relative w-12 h-6 rounded-full transition-colors ${formData.alwaysAvailable ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.alwaysAvailable ? 'translate-x-7' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>

                        {/* Custom Times (Only shown if NOT always available) */}
                        {!formData.alwaysAvailable && (
                            <div>
                                <p className="text-[10px] font-medium text-gray-600 mb-2">Select available times:</p>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((time) => (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => toggleTime(time)}
                                            className={`py-2 px-3 text-xs font-medium rounded-sm border transition-all ${formData.availableTimes.includes(time)
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-600 hover:text-blue-600'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[8px] text-gray-400 mt-2">Select the times you are available for appointments</p>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !formData.name || !formData.specialty}
                        className="w-full py-4 bg-blue-600 text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin inline mr-2" />
                                SAVING...
                            </>
                        ) : 'SAVE PROFILE'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DoctorProfileForm;