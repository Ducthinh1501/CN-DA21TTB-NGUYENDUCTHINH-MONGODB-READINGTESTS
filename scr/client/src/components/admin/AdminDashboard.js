import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  TablePagination
} from '@mui/material';
import { 
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  School as SchoolIcon 
} from '@mui/icons-material';
import axios from 'axios';

function AdminDashboard() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Stats
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    totalUsers: 0
  });

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/test-results', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const results = response.data.data;
        setTestResults(results);
        
        // Calculate stats
        setStats({
          totalTests: results.length,
          averageScore: results.reduce((acc, curr) => acc + curr.score, 0) / results.length,
          totalUsers: new Set(results.map(r => r.user?._id)).size
        });
      } catch (err) {
        setError('Failed to fetch test results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress />
    </Box>
  );

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.totalUsers}
              </Typography>
              <Typography color="text.secondary">
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <SchoolIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.totalTests}
              </Typography>
              <Typography color="text.secondary">
                Total Tests Taken
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AssessmentIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.averageScore.toFixed(1)}%
              </Typography>
              <Typography color="text.secondary">
                Average Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Results Table */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Typography variant="h6" sx={{ p: 2 }}>
            Recent Test Results
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Test Title</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell>Completion Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testResults
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((result) => (
                  <TableRow key={result._id} hover>
                    <TableCell>{result.user?.email || 'Unknown'}</TableCell>
                    <TableCell>{result.test?.title || 'Unknown Test'}</TableCell>
                    <TableCell align="right">
                      <Typography
                        color={result.score >= 70 ? 'success.main' : 'error.main'}
                        fontWeight="bold"
                      >
                        {result.score}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(result.completedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={testResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}

export default AdminDashboard;