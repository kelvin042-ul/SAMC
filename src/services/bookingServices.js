import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
    orderBy,
    Timestamp,
    and
} from "firebase/firestore";
import { db } from "../data/firebaseConfig";

// ============================================
// 1. FETCH ALL DOCTORS
// ============================================
export const fetchDoctors = async () => {
    try {
        const snapshot = await getDocs(collection(db, "doctors"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
};

// ============================================
// 2. FETCH DOCTORS BY DEPARTMENT
// ============================================
export const fetchDoctorsByDepartment = async (department) => {
    try {
        const q = query(
            collection(db, "doctors"),
            where("department", "==", department)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching doctors by department:", error);
        return [];
    }
};

// ============================================
// 3. FETCH SINGLE DOCTOR BY ID
// ============================================
export const fetchDoctorById = async (doctorId) => {
    try {
        const docRef = doc(db, "doctors", doctorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching doctor:", error);
        return null;
    }
};

// ============================================
// 4. FETCH UNIQUE DEPARTMENTS FROM DOCTORS
// ============================================
export const fetchDepartments = async () => {
    try {
        const snapshot = await getDocs(collection(db, "doctors"));
        const departments = [...new Set(snapshot.docs.map(doc => doc.data().department))];
        return departments.filter(d => d && d.trim() !== '');
    } catch (error) {
        console.error("Error fetching departments:", error);
        return [];
    }
};
// ============================================
// 5. GET APPOINTMENTS FOR A DOCTOR ON A SPECIFIC DATE (REAL-TIME)
// ============================================
export const getDoctorAppointmentsForDate = (doctorId, date, callback) => {
    try {
        // First, get the doctor's profile to check if they're always available
        const doctorRef = doc(db, "doctors", doctorId);

        getDoc(doctorRef).then((doctorSnap) => {
            if (doctorSnap.exists()) {
                const doctorData = doctorSnap.data();

                // If doctor is always available, just return empty booked times
                if (doctorData.alwaysAvailable === true) {
                    callback([]); // No booked times to check
                    return;
                }
            }

            // If not always available, check booked times
            const q = query(
                collection(db, "appointments"),
                and(
                    where("doctorId", "==", doctorId),
                    where("date", "==", date),
                    where("status", "in", ["pending", "confirmed"])
                )
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const bookedTimes = [];
                snapshot.forEach((doc) => {
                    bookedTimes.push(doc.data().time);
                });
                callback(bookedTimes);
            });

            return unsubscribe;
        }).catch((error) => {
            console.error("Error checking doctor availability:", error);
            callback([]);
        });

        return () => { };
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return null;
    }
};
// ============================================
// 6. BOOK AN APPOINTMENT
// ============================================
export const bookAppointment = async (appointmentData) => {
    try {
        const docRef = await addDoc(collection(db, "appointments"), {
            ...appointmentData,
            status: "pending",
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error booking appointment:", error);
        return { success: false, error: error.message };
    }
};