import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../data/firebaseConfig';
import { LogOut, Stethoscope } from 'lucide-react';

const DoctorHeader = ({ doctorProfile }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/doctor-login');
    };

    return (
        <div className="bg-blue-600 text-white p-4 rounded-sm mb-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3">
                <Stethoscope size={28} />
                <div>
                    <h2 className="text-lg font-bold">Dr. {doctorProfile?.name || 'Doctor'}</h2>
                    <p className="text-blue-200 text-sm">{doctorProfile?.specialty} • {doctorProfile?.department}</p>
                </div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
                <button
                    onClick={() => navigate('/doctor-profile')}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm"
                >
                    Profile Settings
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm"
                >
                    <LogOut size={14} /> Logout
                </button>
            </div>
        </div>
    );
};

export default DoctorHeader;