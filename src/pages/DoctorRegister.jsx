import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';

const DoctorRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        const result = await register(formData.email, formData.password, formData.name);

        if (result.success) {
            navigate('/doctor-dashboard');
        } else {
            if (result.error.includes('email-already-in-use')) {
                setError('This email is already registered. Please login instead.');
            } else if (result.error.includes('invalid-email')) {
                setError('Please enter a valid email address.');
            } else {
                setError(result.error);
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] px-4 pt-[104px]">
            <div className="max-w-md w-full bg-white p-10 shadow-2xl rounded-sm border-t-4 border-blue-600">
                <Link to="/doctor-login" className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-blue-600 transition-colors mb-6">
                    <ArrowLeft size={14} />
                    Back to Login
                </Link>

                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                        <ShieldCheck size={32} className="text-blue-600" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tighter mb-2">Doctor Registration</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">Create Your Medical Account</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-sm">
                        <p className="text-red-500 text-xs text-center">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative border-b border-gray-100 pb-2">
                        <User className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            className="w-full p-3 pl-8 outline-none focus:border-black transition-colors text-sm bg-transparent"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="relative border-b border-gray-100 pb-2">
                        <Mail className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type="email"
                            placeholder="Doctor Email"
                            required
                            className="w-full p-3 pl-8 outline-none focus:border-black transition-colors text-sm bg-transparent"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="relative border-b border-gray-100 pb-2">
                        <Lock className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password (min. 6 characters)"
                            required
                            className="w-full p-3 pl-8 pr-10 outline-none focus:border-black transition-colors text-sm bg-transparent"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-3 text-gray-300 hover:text-black"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative border-b border-gray-100 pb-2">
                        <Lock className="absolute left-0 top-3 text-gray-300" size={18} />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            required
                            className="w-full p-3 pl-8 pr-10 outline-none focus:border-black transition-colors text-sm bg-transparent"
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-0 top-3 text-gray-300 hover:text-black"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-[10px] text-gray-400">
                        Already have an account?{' '}
                        <Link to="/doctor-login" className="text-blue-600 hover:underline font-bold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DoctorRegister;