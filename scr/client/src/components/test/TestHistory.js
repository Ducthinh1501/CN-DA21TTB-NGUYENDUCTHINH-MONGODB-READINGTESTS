import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Button,
    Chip,
    CircularProgress,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TestHistory.css';

const TestHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/tests/history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('History data:', response.data);
                setHistory(response.data);
            } catch (err) {
                console.error('Error fetching history:', err);
                setError('Failed to fetch test history');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('vi-VN', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" className="history-container">
            <Box mb={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Test History
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    View your past test results and performance
                </Typography>
            </Box>
            
            {history.length === 0 ? (
                <Paper className="empty-state">
                    <Typography variant="h6" color="textSecondary">
                        You haven't taken any tests yet
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate('/tests')}
                        sx={{ mt: 2 }}
                    >
                        Take a Test
                    </Button>
                </Paper>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Test Title</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Difficulty</TableCell>
                                <TableCell align="center">Score</TableCell>
                                <TableCell align="center">Completed</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((result) => (
                                <TableRow key={result._id} hover>
                                    <TableCell>{result.test.title}</TableCell>
                                    <TableCell align="center">
                                        <Chip 
                                            label={result.test.category} 
                                            color="primary" 
                                            size="small" 
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip 
                                            label={result.test.difficulty}
                                            color={
                                                result.test.difficulty === 'easy' ? 'success' :
                                                result.test.difficulty === 'medium' ? 'warning' : 'error'
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography 
                                            color={result.score >= 70 ? 'success.main' : 'error.main'}
                                            fontWeight="bold"
                                        >
                                            {result.score}%
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        {formatDate(result.completedAt)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => navigate(`/tests/results/${result._id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default TestHistory; 