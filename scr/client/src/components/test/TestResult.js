import React from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Paper, 
    Button 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './TestResult.css';

const TestResult = ({ test, answers, score }) => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" className="test-result-container">
            <Paper elevation={3} className="result-paper">
                <Box className="result-header">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Test Completed!
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Your Score: {score.toFixed(2)}%
                    </Typography>
                </Box>

                <Box className="questions-container">
                    {test.questions.map((question, index) => (
                        <Paper key={index} className="question-card">
                            <Typography variant="subtitle1" gutterBottom>
                                Question {index + 1}: {question.questionText}
                            </Typography>
                            <Typography variant="body2" color={
                                answers[index] === question.correctAnswer ? "success.main" : "error.main"
                            }>
                                Your answer: {answers[index]}
                            </Typography>
                            <Typography variant="body2" color="primary">
                                Correct answer: {question.correctAnswer}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Explanation: {question.explanation}
                            </Typography>
                        </Paper>
                    ))}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/tests')}
                    sx={{ mt: 3 }}
                >
                    Back to Tests
                </Button>
            </Paper>
        </Container>
    );
};

export default TestResult; 