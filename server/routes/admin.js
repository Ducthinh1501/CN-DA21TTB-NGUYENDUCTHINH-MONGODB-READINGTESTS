const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const TestResult = require('../models/TestResult');

// Middleware kiểm tra role admin
const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin only.'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get all test results
router.get('/test-results', auth, isAdmin, async (req, res) => {
    try {
        const results = await TestResult.find()
            .populate('user', 'email username')
            .populate('test', 'title');

        res.json({
            success: true,
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching test results'
        });
    }
});

module.exports = router;