// src/components/tests/Tests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Box, 
    Button,
    CircularProgress,
    Alert,
    Chip,
    TextField,
    MenuItem,
    Grid,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Tests.css';

const Tests = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filteredTests, setFilteredTests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/tests', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                console.log('Raw test data:', response.data);
                
                const validTests = response.data.filter(test => 
                    test && test.title && test.category && test.difficulty
                );
                
                console.log('Valid tests:', validTests);
                setTests(validTests);
                setFilteredTests(validTests);
            } catch (err) {
                console.error('Error fetching tests:', err);
                setError('Failed to fetch tests');
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, [navigate]);

    useEffect(() => {
        if (!tests.length) {
            console.log('No tests available to filter');
            return;
        }

        console.log('Starting filter process with:', {
            searchTerm,
            selectedCategory,
            selectedDifficulty,
            totalTests: tests.length
        });

        let result = [...tests];

        console.log('Available categories:', new Set(tests.map(t => t.category)));
        console.log('Available difficulties:', new Set(tests.map(t => t.difficulty)));

        if (searchTerm.trim()) {
            result = result.filter(test => {
                const searchLower = searchTerm.toLowerCase();
                const titleMatch = test.title?.toLowerCase().includes(searchLower);
                const descMatch = test.description?.toLowerCase().includes(searchLower);
                return titleMatch || descMatch;
            });
            console.log('After search filter:', result.length);
        }

        if (selectedCategory && selectedCategory !== 'all') {
            result = result.filter(test => {
                const testCategory = test.category?.toLowerCase();
                const selectedCat = selectedCategory.toLowerCase();
                const matches = testCategory === selectedCat;
                console.log(`Category comparison: ${testCategory} === ${selectedCat} = ${matches}`);
                return matches;
            });
            console.log('After category filter:', result.length);
        }

        if (selectedDifficulty && selectedDifficulty !== 'all') {
            result = result.filter(test => {
                const testDifficulty = test.difficulty?.toLowerCase();
                const selectedDiff = selectedDifficulty.toLowerCase();
                const matches = testDifficulty === selectedDiff;
                console.log(`Difficulty comparison: ${testDifficulty} === ${selectedDiff} = ${matches}`);
                return matches;
            });
            console.log('After difficulty filter:', result.length);
        }

        console.log('Final filtered results:', {
            resultCount: result.length,
            results: result
        });

        setFilteredTests(result);
    }, [tests, searchTerm, selectedCategory, selectedDifficulty]);

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

    const categories = ['all', ...new Set(tests
        .filter(test => test && test.category)
        .map(test => test.category)
    )];

    const difficulties = ['all', ...new Set(tests
        .filter(test => test && test.difficulty)
        .map(test => test.difficulty)
    )];

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="test-list-container">
            <div className="test-list-header">
                <h1>Reading Comprehension Tests</h1>
                <p>Select a test to begin your assessment</p>
            </div>

            <Box mb={2}>
                <Typography variant="caption">
                    Available Tests: {tests.length} | 
                    Filtered Tests: {filteredTests.length} | 
                    Categories: {categories.join(', ')} | 
                    Difficulties: {difficulties.join(', ')}
                </Typography>
            </Box>

            <Box mb={4} className="filters-container">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Search tests"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by title or description"
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField
                            select
                            fullWidth
                            label="Category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <MenuItem key={category} value={category.toLowerCase()}>
                                    {category === 'all' ? 'All Categories' : category}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField
                            select
                            fullWidth
                            label="Difficulty"
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                        >
                            <MenuItem value="all">All Difficulties</MenuItem>
                            <MenuItem value="easy">Easy</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="hard">Hard</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            )}

            {!loading && filteredTests.length === 0 ? (
                <Alert severity="info">
                    No tests found matching your criteria. Try adjusting your filters.
                </Alert>
            ) : (
                <div className="test-grid">
                    {filteredTests.map((test) => (
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
                                        <span>Questions:</span> {test.questions?.length || 0}
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
            )}
        </div>
    );
};

export default Tests;