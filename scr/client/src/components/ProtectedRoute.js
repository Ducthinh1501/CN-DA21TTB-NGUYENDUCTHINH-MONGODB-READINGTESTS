// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    
    if (loading) {
        return <div>Loading...</div>;
    }

    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Nếu đã authenticated, render children
    return children;
};

export default ProtectedRoute;