// src/components/tests/Tests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Box, 
    Button,
    CircularProgress,
    Alert,
    Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Tests.css';

const Tests = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/tests', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('API Response:', response.data);
                setTests(response.data);
            } catch (err) {
                console.error('Error details:', err.response);
                setError('Failed to fetch tests');
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy':
                return '#10B981';
            case 'medium':
                return '#F59E0B';
            case 'hard':
                return '#EF4444';
            default:
                return '#6B7280';
        }
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
        <div className="test-list-container">
            <div className="test-list-header">
                <h1>Reading Comprehension Tests</h1>
                <p>Select a test to begin your assessment</p>
            </div>

            <div className="test-grid">
                {tests && tests.map((test) => (
                    <div className="test-card" key={test._id}>
                        <div className="test-card-header">
                            <h3>{test.title}</h3>
                            <Chip 
                                label={test.category}
                                size="small"
                                className="category-tag"
                            />
                        </div>
                        <div className="test-card-body">
                            <div className="test-info">
                                <div className="test-info-item">
                                    <span>Description:</span> {test.description}
                                </div>
                                <div className="test-info-item">
                                    <span>Time Limit:</span> {test.timeLimit} mins
                                </div>
                                <div className="test-info-item">
                                    <span>Questions:</span> {test.questions ? test.questions.length : 0}
                                </div>
                                <div className="test-info-item">
                                    <Chip 
                                        label={test.difficulty}
                                        size="small"
                                        style={{
                                            backgroundColor: getDifficultyColor(test.difficulty),
                                            color: 'white'
                                        }}
                                    />
                                </div>
                            </div>
                            <Button 
                                className="start-test-btn"
                                onClick={() => navigate(`/tests/${test._id}`)}
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Start Test
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tests;