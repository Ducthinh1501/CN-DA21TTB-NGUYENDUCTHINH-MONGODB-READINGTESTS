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

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
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

                        {/* Redirect any unknown routes to home */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;