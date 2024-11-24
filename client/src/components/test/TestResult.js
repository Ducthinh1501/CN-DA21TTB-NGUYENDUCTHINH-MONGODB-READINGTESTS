import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

function TestResult({ result }) {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Test Results
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">
            Score: {result.score}%
          </Typography>
          <Typography variant="body1">
            Time taken: {Math.floor(result.timeTaken / 60)}:{(result.timeTaken % 60).toString().padStart(2, '0')}
          </Typography>
        </Box>

        <List>
          {result.answers.map((answer, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`Question ${index + 1}`}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography 
                        variant="body2"
                        color={answer.isCorrect ? 'success.main' : 'error.main'}
                      >
                        {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'} - 
                        Your answer: Option {answer.selectedAnswer + 1}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default TestResult;
