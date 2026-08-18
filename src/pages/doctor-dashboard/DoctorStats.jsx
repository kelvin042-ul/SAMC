const DoctorStats = ({ appointments }) => {
    const pendingCount = appointments.filter(a => a.status === 'pending').length;
    const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
    const completedCount = appointments.filter(a => a.status === 'completed').length;
    const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 border border-gray-100 rounded-sm shadow-sm">
                <p className="text-[8px] uppercase tracking-widest text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="bg-white p-4 border border-gray-100 rounded-sm shadow-sm">
                <p className="text-[8px] uppercase tracking-widest text-gray-400">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
            </div>
            <div className="bg-white p-4 border border-gray-100 rounded-sm shadow-sm">
                <p className="text-[8px] uppercase tracking-widest text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
            </div>
            <div className="bg-white p-4 border border-gray-100 rounded-sm shadow-sm">
                <p className="text-[8px] uppercase tracking-widest text-gray-400">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
            </div>
        </div>
    );
};

export default DoctorStats;