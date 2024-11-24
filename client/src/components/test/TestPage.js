import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

function TestPage() {
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  // Move handleSubmit before useEffect and wrap in useCallback
  const handleSubmit = useCallback(async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/tests/submit`, {
        answers,
        timeTaken: test.timeLimit * 60 - timeLeft
      });
      navigate(`/test-results/${response.data._id}`);
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  }, [answers, timeLeft, test, navigate]);

  useEffect(() => {
    if (!timeLeft || !test) return;

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
  }, [timeLeft, test, handleSubmit]);

  const handleAnswerChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(event.target.value);
    setAnswers(newAnswers);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">
            Question {currentQuestion + 1} of {test?.questions?.length}
          </Typography>
          <Typography>
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Typography>
        </Box>

        {test?.questions[currentQuestion] && (
          <>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {test.questions[currentQuestion].passage}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
              {test.questions[currentQuestion].questionText}
            </Typography>

            <RadioGroup
              value={answers[currentQuestion] ?? ''}
              onChange={handleAnswerChange}
            >
              {test.questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </>
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
          >
            Previous
          </Button>
          
          {currentQuestion === test?.questions?.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={answers.includes(null)}
            >
              Submit Test
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => setCurrentQuestion(prev => prev + 1)}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default TestPage;
