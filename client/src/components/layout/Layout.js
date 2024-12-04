// src/components/layout/Layout.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleTitleClick = () => {
        navigate('/Home');
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            flexGrow: 1, 
                            cursor: 'pointer', 
                            '&:hover': {       
                                opacity: 0.8
                            }
                        }}
                        onClick={handleTitleClick}
                    >
                        Reading Test App
                    </Typography>
                    {user ? (
                        <>
                            <Button color="inherit" onClick={() => navigate('/tests')}>
                                Tests
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ p: 3 }}>
                {children}
            </Box>
        </>
    );
};

export default Layout;