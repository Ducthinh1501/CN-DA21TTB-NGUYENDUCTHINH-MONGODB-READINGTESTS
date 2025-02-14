import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  Box
} from '@mui/material';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
       
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        navigate('/tests');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 8
        }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 700, mb: 4 }}
          >
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              sx={{ mb: 2 }}
            />

            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              sx={{ mb: 2 }}
              helperText="Password must be at least 6 characters long"
            />

            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                mb: 2
              }}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Already have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/login"
                  sx={{ 
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Login here
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;