const TodayPatients = ({ appointments, getStatusColor }) => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(a => a.date === today);

    if (todayAppointments.length === 0) return null;

    return (
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
    );
};

export default TodayPatients;