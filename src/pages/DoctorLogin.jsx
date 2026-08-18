import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const DoctorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/doctor-dashboard');
        } else {
            if (result.error.includes('user-not-found')) {
                setError('No account found with this email. Please register first.');
            } else if (result.error.includes('wrong-password')) {
                setError('Incorrect password. Please try again.');
            } else {
                setError('Login failed. Please try again.');
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] px-4 pt-[104px]">
            <div className="max-w-md w-full bg-white p-10 shadow-2xl rounded-sm border-t-4 border-blue-600">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                        <ShieldCheck size={32} className="text-blue-600" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tighter mb-2">Doctor Portal</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">Authorized Medical Personnel Only</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-sm">
                        <p className="text-red-500 text-xs text-center">{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative border-b border-gray-100 pb-2">
                        <Mail className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type="email"
                            placeholder="Doctor Email"
                            required
                            className="w-full p-3 pl-8 outline-none focus:border-black transition-colors text-sm bg-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative border-b border-gray-100 pb-2">
                        <Lock className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full p-3 pl-8 outline-none focus:border-black transition-colors text-sm bg-transparent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 text-white font-bold uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'AUTHENTICATING...' : 'ENTER DASHBOARD'}
                        {!loading && <ArrowRight size={14} />}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-[10px] text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/doctor-register" className="text-blue-600 hover:underline font-bold">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DoctorLogin;