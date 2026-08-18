import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!currentUser) {
        // Save the attempted location to redirect back after login
        return <Navigate to="/customer-login" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default ProtectedRoute;