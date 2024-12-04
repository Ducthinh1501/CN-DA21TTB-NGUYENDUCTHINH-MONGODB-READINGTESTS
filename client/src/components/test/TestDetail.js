// src/components/tests/TestDetail.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
    Container, 
    Typography, 
    Box, 
    Button, 
    Radio, 
    RadioGroup,
    FormControlLabel,
    FormControl,
    Paper,
    CircularProgress,
    Alert,
    Chip,
    Divider
} from '@mui/material';
import './TestDetail.css';
import TestResult from './TestResult';

const TestDetail = () => {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/tests/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTest(response.data);
                setTimeLeft(response.data.timeLimit * 60); // Convert minutes to seconds
                const initialAnswers = {};
                response.data.questions.forEach((q, index) => {
                    initialAnswers[index] = '';
                });
                setAnswers(initialAnswers);
            } catch (err) {
                setError('Failed to fetch test details');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTest();
    }, [id]);

    const handleAnswerChange = (questionIndex, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: value
        }));
    };

    const handleSubmit = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            // Convert answers object to array format
            const answersArray = Object.values(answers);
            
            console.log('Submitting answers:', answersArray); // Debug log

            const response = await axios.post(
                `http://localhost:5000/api/tests/${id}/submit`,
                { answers: answersArray },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            console.log('Submit response:', response.data); // Debug log
            
            setScore(response.data.score);
            setSubmitted(true);
        } catch (err) {
            console.error('Submit error:', err.response?.data || err); // Detailed error log
            setError('Failed to submit test');
        }
    }, [id, answers]);

    useEffect(() => {
        if (!timeLeft || submitted) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, submitted, handleSubmit]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
        <Container maxWidth="lg" className="test-detail-container">
            <Paper elevation={3} className="test-paper">
                {/* Header Section */}
                <Box className="test-header">
                    <Typography variant="h4" component="h1" gutterBottom>
                        {test.title}
                    </Typography>
                    <Box display="flex" gap={2} alignItems="center" justifyContent="center" mb={2}>
                        <Chip label={`${test.category}`} color="primary" />
                        <Chip label={`${test.difficulty}`} 
                            color={
                                test.difficulty === 'easy' ? 'success' : 
                                test.difficulty === 'medium' ? 'warning' : 'error'
                            } 
                        />
                        <Chip label={`Time Left: ${formatTime(timeLeft)}`} 
                            color={timeLeft < 300 ? 'error' : 'default'}
                        />
                    </Box>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        {test.description}
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Reading Passage */}
                <Box className="passage-container">
                    <Typography variant="h6" gutterBottom>
                        Reading Passage
                    </Typography>
                    <Paper elevation={1} className="passage-paper">
                        <Typography variant="body1">
                            {test.passage}
                        </Typography>
                    </Paper>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Questions Section */}
                {!submitted ? (
                    <Box className="questions-container">
                        <Typography variant="h6" gutterBottom>
                            Questions
                        </Typography>
                        {test.questions.map((question, index) => (
                            <Paper key={index} className="question-card">
                                <Typography variant="subtitle1" gutterBottom>
                                    Question {index + 1}: {question.questionText}
                                </Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        value={answers[index] || ''}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="True" />
                                        <FormControlLabel value="false" control={<Radio />} label="False" />
                                        <FormControlLabel value="not given" control={<Radio />} label="Not Given" />
                                    </RadioGroup>
                                </FormControl>
                            </Paper>
                        ))}
                        <Box className="submit-container">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handleSubmit}
                                className="submit-button"
                            >
                                Submit Test
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <TestResult test={test} answers={answers} score={score} />
                )}
            </Paper>
        </Container>
    );
};

export default TestDetail;