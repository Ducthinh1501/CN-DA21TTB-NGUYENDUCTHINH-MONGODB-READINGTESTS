import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, isAdmin } = useAuth();
    console.log('AdminRoute - Current user:', user);
    console.log('AdminRoute - Is admin:', isAdmin);

    if (!user || !isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute; 