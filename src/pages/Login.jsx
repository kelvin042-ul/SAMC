import { useState } from 'react';
import { auth } from '../data/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (email !== import.meta.env.VITE_ADMIN_EMAIL) {
                alert("Access Denied: Not an admin email.");
                return;
            }
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (error) {
            alert("Login Failed: " + error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <form onSubmit={handleLogin} className="bg-white p-8 shadow-xl rounded-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-brandPurple uppercase tracking-tighter">Admin Login</h2>
                <div className="space-y-4">
                    <input
                        type="email" placeholder="Admin Email" required
                        className="w-full border p-4 outline-none focus:border-brandPurple"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password" placeholder="Password" required
                        className="w-full border p-4 outline-none focus:border-brandPurple"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-brandPurple transition-all">
                        Enter Dashboard
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;