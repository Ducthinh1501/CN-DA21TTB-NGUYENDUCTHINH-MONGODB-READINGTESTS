import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Paper,
  useTheme
} from '@mui/material';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: 'Reading Tests',
      description: 'Practice with various reading comprehension tests designed to improve your skills',
      image: '/images/reading.jpg'
    },
    {
      title: 'Instant Feedback',
      description: 'Get immediate results and detailed explanations for each question',
      image: '/images/feedback.jpg'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your improvement over time with detailed statistics',
      image: '/images/progress.jpg'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          pt: { xs: 6, md: 8 },
          pb: { xs: 4, md: 6 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  Improve Your Reading Skills
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4,
                    opacity: 0.9,
                    lineHeight: 1.5
                  }}
                >
                  Master reading comprehension with our interactive platform. 
                  Practice tests, track progress, and achieve your goals.
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/tests')}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 600
                    }}
                  >
                    Start Practice
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Sign Up Free
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/hero-image.png"
                alt="Reading"
                sx={{
                  width: '100%',
                  maxWidth: 600,
                  height: 'auto',
                  display: 'block',
                  margin: 'auto',
                  filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.2))'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: { xs: 6, md: 8 },
            fontWeight: 700
          }}
        >
          Why Choose Us
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'grey.50',
          py: { xs: 8, md: 12 },
          borderRadius: '40px 40px 0 0'
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: 4,
              bgcolor: 'white'
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Ready to Get Started?
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              paragraph
              sx={{ mb: 4 }}
            >
              Join thousands of students improving their reading skills every day
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              Create Free Account
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;