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
import { 
  Speed as SpeedIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: 'Adaptive Learning',
      description: 'Our system adapts to your level and provides personalized reading materials',
      icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: '#e8f5e9'
    },
    {
      title: 'Real-time Progress',
      description: 'Track your improvement with detailed analytics and performance metrics',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: '#e3f2fd'
    },
    {
      title: 'Quick Results',
      description: 'Get instant feedback and detailed explanations for each answer',
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: '#f3e5f5'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `
            linear-gradient(135deg, 
              #0f172a 0%,
              #1e293b 100%
            )
          `,
          position: 'relative',
          color: 'white',
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.13) 0%, transparent 33%),
              radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.13) 0%, transparent 33%)
            `,
            zIndex: 1
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/images/grid.png")',
            backgroundSize: '30px 30px',
            opacity: 0.4,
            zIndex: 2
          }
        }}
      >
        {/* Animated dots background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.5,
            background: 'radial-gradient(#ffffff33 1px, transparent 1px)',
            backgroundSize: '38px 38px',
            animation: 'moveBackground 20s linear infinite',
            '@keyframes moveBackground': {
              '0%': {
                backgroundPosition: '0 0'
              },
              '100%': {
                backgroundPosition: '38px 38px'
              }
            },
            zIndex: 3
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 4 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Typography
                    component="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
                      fontWeight: 800,
                      lineHeight: 1.2,
                      mb: 3,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: '-20px',
                        top: '-20px',
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(45deg, #00f2fe, #4facfe)',
                        borderRadius: '50%',
                        filter: 'blur(20px)',
                        opacity: 0.6
                      }
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: 'block',
                        background: 'linear-gradient(to right, #fff, #e0e7ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        position: 'relative'
                      }}
                    >
                      Master Reading
                    </Box>
                    <Box
                      component="span"
                      sx={{
                        display: 'block',
                        background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        position: 'relative'
                      }}
                    >
                      
                    </Box>
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      lineHeight: 1.8,
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.9)',
                      position: 'relative',
                      textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      maxWidth: '90%'
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      Transform your reading comprehension with our
                      <Box
                        component="span"
                        sx={{
                          color: '#a78bfa',
                          fontWeight: 600,
                          mx: 1
                        }}
                      >
                        
                      </Box>
                      platform. Practice with curated materials and track your progress in real-time.
                    </motion.div>
                  </Typography>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={3}
                      sx={{ mb: { xs: 4, md: 0 } }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/register')}
                        sx={{
                          py: 2,
                          px: 4,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: '16px',
                          background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                          boxShadow: '0 4px 15px 0 rgba(65,132,234,0.35)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px 0 rgba(65,132,234,0.45)'
                          },
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        Start Free Trial
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/tests')}
                        sx={{
                          py: 2,
                          px: 4,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: '16px',
                          borderWidth: '2px',
                          borderColor: 'rgba(255,255,255,0.3)',
                          backdropFilter: 'blur(10px)',
                          color: 'white',
                          '&:hover': {
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            transform: 'translateY(-2px)'
                          },
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        Explore Tests
                      </Button>
                    </Stack>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '140%',
                      height: '140%',
                      background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)',
                      zIndex: -1
                    }
                  }}
                >
                  <Box
                    component="img"
                    src="/images/hero-image.png"
                    alt="AI Reading Platform"
                    sx={{
                      width: '100%',
                      maxWidth: 600,
                      height: 'auto',
                      transform: 'perspective(1000px) rotateY(-15deg)',
                      transition: 'transform 0.5s ease-in-out',
                      filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.15))',
                      '&:hover': {
                        transform: 'perspective(1000px) rotateY(-5deg) translateY(-10px)'
                      }
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container 
        sx={{ 
          py: { xs: 8, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(248,250,252,0.5) 0%, rgba(248,250,252,0.8) 100%)',
            zIndex: -1
          }
        }}
      >
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  bgcolor: feature.color,
                  border: 'none',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {feature.icon}
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mt: 2,
                      mb: 1,
                      fontWeight: 700 
                    }}
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

      {/* Statistics Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: `
            linear-gradient(135deg, 
              #f8fafc 0%,
              #f1f5f9 50%,
              #e2e8f0 100%
            )
          `,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.03) 0%, transparent 70%)',
            zIndex: 0
          }
        }}
      >
        <Container>
          <Grid container spacing={4} justifyContent="center">
            {[
              { number: '10K+', label: 'Active Students' },
              { number: '50+', label: 'Practice Tests' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 4,
                    bgcolor: 'white',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography color="text.secondary" variant="h6">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container 
        sx={{ 
          py: { xs: 8, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            zIndex: -1
          }
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: { xs: 6, md: 8 },
            fontWeight: 700
          }}
        >
          How It Works
        </Typography>
        
        <Grid container spacing={4}>
          {[
            {
              step: '01',
              title: 'Create Account',
              description: 'Sign up for free and set up your profile with your learning preferences'
            },
            {
              step: '02',
              title: 'Choose Tests',
              description: 'Select from our wide range of reading comprehension tests based on your level'
            },
            {
              step: '03',
              title: 'Practice & Learn',
              description: 'Complete tests, receive instant feedback, and learn from detailed explanations'
            },
            {
              step: '04',
              title: 'Track Progress',
              description: 'Monitor your improvement with detailed analytics and performance insights'
            }
          ].map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box
                sx={{
                  position: 'relative',
                  p: 4,
                  borderRadius: 4,
                  bgcolor: 'white',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                    borderRadius: '4px 4px 0 0'
                  }
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    opacity: 0.1,
                    position: 'absolute',
                    top: 10,
                    right: 20
                  }}
                >
                  {item.step}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 600
                  }}
                >
                  {item.title}
                </Typography>
                <Typography color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: `
            linear-gradient(135deg,
              #f1f5f9 0%,
              #e2e8f0 100%
            )
          `,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)',
            zIndex: 0
          }
        }}
      >
        <Container>
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: { xs: 6, md: 8 },
              fontWeight: 700
            }}
          >
            What Our Students Say
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                name: 'Sarah Johnson',
                role: 'English Student',
                comment: 'This platform has significantly improved my reading comprehension skills. The practice tests are challenging and the feedback is very helpful.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'IELTS Candidate',
                comment: 'I improved my IELTS reading score from 6.5 to 8.0 after using this platform for three months. The variety of tests and detailed explanations made a huge difference.',
                rating: 5
              },
              {
                name: 'Emma Davis',
                role: 'High School Student',
                comment: 'The platform is user-friendly and the progress tracking feature keeps me motivated. I can see my improvement over time.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    borderRadius: 4,
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        fontStyle: 'italic',
                        color: 'text.secondary'
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Original CTA Section continues here ... */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
              border: '1px solid',
              borderColor: 'grey.100'
            }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #1e293b, #334155)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Start Your Journey Today
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
            >
              Join thousands of students who are already improving their reading comprehension skills
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '12px',
                background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px 0 rgba(0,0,0,0.2)'
                }
              }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;