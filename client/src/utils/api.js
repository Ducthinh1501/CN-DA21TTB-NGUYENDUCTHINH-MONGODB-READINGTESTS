// src/api/auth.js
const API_URL = 'http://localhost:5000/api';

export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        // Kiểm tra response status
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        // Kiểm tra response status
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        
        // Lưu token và user info vào localStorage
        if (data.data?.token) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Thêm hàm logout
export const logout = () => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Logout error:', error);
    }
};

// Thêm hàm kiểm tra authentication
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

// Thêm hàm lấy token
export const getToken = () => {
    return localStorage.getItem('token');
};

// Thêm hàm lấy user info
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};