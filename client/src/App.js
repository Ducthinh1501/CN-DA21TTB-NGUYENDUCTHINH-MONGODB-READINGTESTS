// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Tests from './components/test/Tests';
import TestDetail from './components/test/TestDetail';
import Home from './components/Home';
import TestHistory from './components/test/TestHistory';
import AdminRoute from './components/auth/AdminRoute';  // Thêm import
import AdminDashboard from './components/admin/AdminDashboard';  
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Tạo theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Modern blue
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#7c3aed', // Modern purple
      light: '#8b5cf6',
      dark: '#6d28d9',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h6: {
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        }
      }
    }
  }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />  {/* Home route */}
                            
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            {/* Protected Routes */}
                            <Route 
                                path="/tests" 
                                element={
                                    <ProtectedRoute>
                                        <Tests />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/tests/:id" 
                                element={
                                    <ProtectedRoute>
                                        <TestDetail />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/tests/history" 
                                element={
                                    <ProtectedRoute>
                                        <TestHistory />
                                    </ProtectedRoute>
                                } 
                            />

                            {/* Admin Route */}
                            <Route 
                                path="/admin" 
                                element={
                                    <AdminRoute>
                                        <AdminDashboard />
                                    </AdminRoute>
                                } 
                            />

                            {/* Redirect any unknown routes to home */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
