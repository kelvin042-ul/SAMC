import { useState } from 'react';
import { db } from '../../data/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { User, Phone, Mail, CheckCircle, Clock, XCircle } from 'lucide-react';

const AppointmentsTable = ({ appointments, doctorProfile, setAppointments }) => {
    const [updating, setUpdating] = useState(null);

    const handleStatusUpdate = async (appointmentId, newStatus) => {
        setUpdating(appointmentId);
        try {
            await updateDoc(doc(db, "appointments", appointmentId), {
                status: newStatus,
                updatedAt: new Date()
            });

            const appointment = appointments.find(a => a.id === appointmentId);
            if (appointment) {
                const message = `🏥 SAMC Hospital - Appointment ${newStatus === 'confirmed' ? 'CONFIRMED' :
                    newStatus === 'cancelled' ? 'CANCELLED' : 'UPDATED'}\n\nHello ${appointment.patientName},\n\nYour appointment with Dr. ${doctorProfile?.name || 'our doctor'} has been ${newStatus}.\n\n📅 Date: ${appointment.date}\n⏰ Time: ${appointment.time}\n\nThank you for choosing SAMC! ❤️`;

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

    return (
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
    );
};

export default AppointmentsTable;