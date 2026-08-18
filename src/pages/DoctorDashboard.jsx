import { useState, useEffect } from 'react';
import { db, auth } from '../data/firebaseConfig';
import { collection, query, where, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import {
    LogOut,
    CheckCircle,
    Clock,
    XCircle,
    Calendar,
    User,
    Phone,
    Mail,
    Stethoscope,
    Loader2,
    AlertCircle
} from 'lucide-react';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctorProfile, setDoctorProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);
    const navigate = useNavigate();
    const currentUser = auth.currentUser;

    // Fetch doctor profile
    useEffect(() => {
        const fetchDoctorProfile = async () => {
            if (!currentUser) return;

            try {
                const q = query(
                    collection(db, "doctors"),
                    where("email", "==", currentUser.email)
                );
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    const doc = snapshot.docs[0];
                    setDoctorProfile({ id: doc.id, ...doc.data() });
                }
            } catch (error) {
                console.error("Error fetching doctor profile:", error);
            }
        };
        fetchDoctorProfile();
    }, [currentUser]);

    // Fetch appointments for this doctor
    useEffect(() => {
        if (!currentUser || !doctorProfile) return;

        setLoading(true);

        // Get the doctor's ID from their profile
        const doctorId = doctorProfile.id;

        const q = query(
            collection(db, "appointments"),
            where("doctorId", "==", doctorId)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const appointmentsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Sort by date and time
            appointmentsData.sort((a, b) => {
                if (a.date !== b.date) return a.date.localeCompare(b.date);
                return a.time.localeCompare(b.time);
            });

            setAppointments(appointmentsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser, doctorProfile]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/doctor-login');
    };

    const handleStatusUpdate = async (appointmentId, newStatus) => {
        setUpdating(appointmentId);
        try {
            await updateDoc(doc(db, "appointments", appointmentId), {
                status: newStatus,
                updatedAt: new Date()
            });

            // WhatsApp notification (simulated)
            const appointment = appointments.find(a => a.id === appointmentId);
            if (appointment) {
                const message = `🏥 [Hospital Name] - Appointment ${newStatus === 'confirmed' ? 'CONFIRMED' :
                    newStatus === 'cancelled' ? 'CANCELLED' : 'UPDATED'
                    }\n\nHello ${appointment.patientName},\n\nYour appointment with Dr. ${doctorProfile?.name || 'our doctor'} has been ${newStatus}.\n\n📅 Date: ${appointment.date}\n⏰ Time: ${appointment.time}\n\nThank you for choosing us! ❤️`;

                // WhatsApp link - doctor doesn't need to type
                const waUrl = `https://wa.me/${appointment.patientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                window.open(waUrl, '_blank');
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update appointment. Please try again.");
        }
        setUpdating(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'completed': return 'bg-blue-100 text-blue-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed': return <CheckCircle size={14} className="inline mr-1" />;
            case 'pending': return <Clock size={14} className="inline mr-1" />;
            case 'completed': return <CheckCircle size={14} className="inline mr-1" />;
            case 'cancelled': return <XCircle size={14} className="inline mr-1" />;
            default: return <Clock size={14} className="inline mr-1" />;
        }
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-[104px]">
                <div className="text-center">
                    <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
                    <h2 className="text-xl font-bold mb-2">Access Denied</h2>
                    <p className="text-gray-500 mb-6">Please login to access the doctor dashboard.</p>
                    <button
                        onClick={() => navigate('/doctor-login')}
                        className="px-6 py-2 bg-blue-600 text-white text-[10px] uppercase tracking-widest rounded-sm hover:bg-blue-700"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-[104px]">
                <Loader2 size={40} className="animate-spin text-blue-600" />
            </div>
        );
    }

    const pendingCount = appointments.filter(a => a.status === 'pending').length;
    const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
    const completedCount = appointments.filter(a => a.status === 'completed').length;
    const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(a => a.date === today);

    return (
        <div className="pt-[104px] pb-12 px-6 max-w-7xl mx-auto min-h-screen bg-[#FDFCFB]">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">Doctor Dashboard</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        Welcome, Dr. {doctorProfile?.name || 'Doctor'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {doctorProfile?.specialty} • {doctorProfile?.department}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/doctor-profile')}
                        className="px-6 py-2 border border-gray-300 text-gray-600 text-[10px] font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all"
                    >
                        Profile Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-red-100 hover:bg-red-100"
                    >
                        <LogOut size={14} /> Logout
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 border border-gray-100 rounded-sm">
                    <p className="text-[8px] uppercase tracking-widest text-gray-400">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <div className="bg-white p-4 border border-gray-100 rounded-sm">
                    <p className="text-[8px] uppercase tracking-widest text-gray-400">Confirmed</p>
                    <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
                </div>
                <div className="bg-white p-4 border border-gray-100 rounded-sm">
                    <p className="text-[8px] uppercase tracking-widest text-gray-400">Completed</p>
                    <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
                </div>
                <div className="bg-white p-4 border border-gray-100 rounded-sm">
                    <p className="text-[8px] uppercase tracking-widest text-gray-400">Cancelled</p>
                    <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
                </div>
            </div>

            {/* Today's Patients */}
            {todayAppointments.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-sm mb-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-3">
                        📅 Today's Patients ({todayAppointments.length})
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {todayAppointments.map((apt) => (
                            <div key={apt.id} className="bg-white px-4 py-2 rounded-sm shadow-sm flex items-center gap-3">
                                <span className="text-sm font-medium">{apt.patientName}</span>
                                <span className="text-[10px] text-gray-400">{apt.time}</span>
                                <span className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded-full ${getStatusColor(apt.status)}`}>
                                    {apt.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Appointments Table */}
            <div className="bg-white border border-gray-100 overflow-x-auto shadow-sm rounded-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 uppercase text-[10px] tracking-widest font-bold text-gray-400">
                            <th className="p-4">Patient</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Date & Time</th>
                            <th className="p-4">Reason</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-12 text-center text-gray-400 text-[10px] uppercase tracking-widest">
                                    No appointments yet
                                </td>
                            </tr>
                        ) : (
                            appointments.map((apt) => (
                                <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-gray-400" />
                                            <span className="text-sm font-bold">{apt.patientName}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-[10px] text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Phone size={12} className="text-gray-400" />
                                                {apt.patientPhone}
                                            </div>
                                            {apt.patientEmail && (
                                                <div className="flex items-center gap-1">
                                                    <Mail size={12} className="text-gray-400" />
                                                    {apt.patientEmail}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm font-medium">{apt.date}</div>
                                        <div className="text-[10px] text-gray-400">{apt.time}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-xs text-gray-600 max-w-xs truncate">
                                            {apt.reason || 'General consultation'}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full ${getStatusColor(apt.status)}`}>
                                            {getStatusIcon(apt.status)} {apt.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        {apt.status === 'pending' && (
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => handleStatusUpdate(apt.id, 'confirmed')}
                                                    disabled={updating === apt.id}
                                                    className="px-3 py-1 bg-green-600 text-white text-[8px] font-bold uppercase tracking-widest hover:bg-green-700 transition-all rounded-sm disabled:opacity-50"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(apt.id, 'cancelled')}
                                                    disabled={updating === apt.id}
                                                    className="px-3 py-1 bg-red-600 text-white text-[8px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all rounded-sm disabled:opacity-50"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                        {apt.status === 'confirmed' && (
                                            <button
                                                onClick={() => handleStatusUpdate(apt.id, 'completed')}
                                                disabled={updating === apt.id}
                                                className="px-3 py-1 bg-blue-600 text-white text-[8px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all rounded-sm disabled:opacity-50"
                                            >
                                                Complete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorDashboard;