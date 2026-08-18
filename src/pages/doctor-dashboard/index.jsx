import { useState, useEffect } from 'react';
import { db, auth } from '../../data/firebaseConfig';
import { collection, query, where, onSnapshot, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import DoctorHeader from './DoctorHeader';
import DoctorStats from './DoctorStats';
import TodayPatients from './TodayPatients';
import AppointmentsTable from './AppointmentsTable';
import DoctorProfileForm from './DoctorProfileForm';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctorProfile, setDoctorProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasProfile, setHasProfile] = useState(false);
    const [checkingProfile, setCheckingProfile] = useState(true);
    const navigate = useNavigate();
    const currentUser = auth.currentUser;

    // ============================================
    // 1. CHECK IF DOCTOR HAS A PROFILE
    // ============================================
    useEffect(() => {
        const checkDoctorProfile = async () => {
            if (!currentUser) {
                setCheckingProfile(false);
                setLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, "doctors"),
                    where("email", "==", currentUser.email)
                );
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const docData = snapshot.docs[0];
                    setDoctorProfile({ id: docData.id, ...docData.data() });
                    setHasProfile(true);
                } else {
                    setHasProfile(false);
                }
            } catch (error) {
                console.error("Error checking doctor profile:", error);
                setHasProfile(false);
            }
            setCheckingProfile(false);
            setLoading(false);
        };

        checkDoctorProfile();
    }, [currentUser]);

    // ============================================
    // 2. FETCH APPOINTMENTS (IF DOCTOR HAS PROFILE)
    // ============================================
    useEffect(() => {
        if (!currentUser || !doctorProfile || !hasProfile) return;

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

            appointmentsData.sort((a, b) => {
                if (a.date !== b.date) return a.date.localeCompare(b.date);
                return a.time.localeCompare(b.time);
            });

            setAppointments(appointmentsData);
        });

        return () => unsubscribe();
    }, [currentUser, doctorProfile, hasProfile]);

    // ============================================
    // 3. LOADING STATE
    // ============================================
    if (loading || checkingProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-[104px]">
                <Loader2 size={40} className="animate-spin text-blue-600" />
            </div>
        );
    }

    // ============================================
    // 4. NO PROFILE → SHOW PROFILE FORM
    // ============================================
    if (!hasProfile) {
        return <DoctorProfileForm onProfileComplete={() => window.location.reload()} />;
    }

    // ============================================
    // 5. RENDER DASHBOARD
    // ============================================
    return (
        <div className="pt-[104px] pb-12 px-6 max-w-7xl mx-auto min-h-screen bg-[#FDFCFB]">
            <DoctorHeader doctorProfile={doctorProfile} />
            <DoctorStats appointments={appointments} />
            <TodayPatients appointments={appointments} getStatusColor={(status) => {
                switch (status) {
                    case 'confirmed': return 'bg-green-100 text-green-700';
                    case 'pending': return 'bg-yellow-100 text-yellow-700';
                    case 'completed': return 'bg-blue-100 text-blue-700';
                    case 'cancelled': return 'bg-red-100 text-red-700';
                    default: return 'bg-gray-100 text-gray-700';
                }
            }} />
            <AppointmentsTable
                appointments={appointments}
                doctorProfile={doctorProfile}
                setAppointments={setAppointments}
            />
        </div>
    );
};

export default DoctorDashboard;