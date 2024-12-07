// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Khởi tạo state từ localStorage
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', credentials);
            
            if (response.data.success) {
                const { token, user } = response.data.data;
                // Lưu vào localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                // Cập nhật state
                setUser(user);
                console.log('User set in context:', user); // Debug log
                return user;
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    // Debug log để theo dõi thay đổi user
    useEffect(() => {
        console.log('Current user in context:', user);
    }, [user]);

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout,
            isAuthenticated: !!user,
            isAdmin: user?.role === 'admin'
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};