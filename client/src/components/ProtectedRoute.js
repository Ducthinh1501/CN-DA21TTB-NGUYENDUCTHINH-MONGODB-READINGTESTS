// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Kiểm tra token trong localStorage
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    // Hiển thị loading khi đang kiểm tra authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    // Nếu không có token, chuyển hướng về trang login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Nếu đã authenticated, render children
    return children;
};

export default ProtectedRoute;