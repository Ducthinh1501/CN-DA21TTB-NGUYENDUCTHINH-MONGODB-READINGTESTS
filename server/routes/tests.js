const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Test = require('../models/Test');
const TestResult = require('../models/TestResult');

/**
 * @swagger
 * /api/tests:
 *   get:
 *     summary: Get all active reading tests
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: List of reading tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   passage:
 *                     type: string
 *                   timeLimit:
 *                     type: number
 *                   difficulty:
 *                     type: string
 *                   category:
 *                     type: string
 *                   isActive:
 *                     type: boolean
 */
router.get('/', auth, async (req, res) => {
    try {
        console.log('Fetching tests...');
        const tests = await Test.find({ isActive: true });
        console.log('Found tests:', tests.length);
        res.json(tests);
    } catch (err) {
        console.error('Error in GET /api/tests:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /api/tests/{id}:
 *   get:
 *     summary: Get a specific reading test by ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The test ID
 *     responses:
 *       200:
 *         description: Reading test found
 *       404:
 *         description: Test not found
 */
router.get('/:id', auth, async (req, res) => {
    try {
        const test = await Test.findOne({ _id: req.params.id, isActive: true });
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.json(test);
    } catch (err) {
        console.error('Error in GET /api/tests/:id:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /api/tests/{id}/submit:
 *   post:
 *     summary: Submit answers for a reading test
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The test ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: object
 *                 properties:
 *                   questionId:
 *                     type: string
 *                   answer:
 *                     type: string
 *     responses:
 *       200:
 *         description: Test submitted successfully
 *       404:
 *         description: Test not found
 */
router.post('/:id/submit', auth, async (req, res) => {
    try {
        console.log('User from request:', req.user);
        console.log('Received submission:', req.body);

        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { answers } = req.body;
        
        if (!Array.isArray(answers)) {
            return res.status(400).json({ message: 'Invalid answers format' });
        }

        let correctCount = 0;
        const answersDetails = test.questions.map((question, index) => {
            const userAnswer = answers[index] || '';
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) correctCount++;
            
            return {
                questionText: question.questionText,
                userAnswer: userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect
            };
        });

        const score = Math.round((correctCount / test.questions.length) * 100);
        console.log('Calculated score:', score);
        console.log('Answers details:', answersDetails);

        // Create new test result
        const testResult = await TestResult.create({
            user: req.user._id,
            test: test._id,
            answers: answersDetails,
            score: score
        });

        console.log('Test result saved:', testResult._id);

        res.json({ 
            score,
            testResultId: testResult._id,
            details: answersDetails
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ 
            message: 'Server error',
            error: err.message 
        });
    }
});

/**
 * @swagger
 * /api/tests/results/me:
 *   get:
 *     summary: Get test results for the authenticated user
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: List of test results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   score:
 *                     type: number
 *                   completedAt:
 *                     type: string
 */
router.get('/results/me', auth, async (req, res) => {
    try {
        const results = await TestResult.find({ user: req.user.id })
            .populate('test', 'title')
            .sort({ completedAt: -1 });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's test history
router.get('/history', auth, async (req, res) => {
    try {
        const results = await TestResult.find({ user: req.user.id })
            .populate('test', 'title category difficulty')
            .sort({ completedAt: -1 });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get specific test result
router.get('/results/:resultId', auth, async (req, res) => {
    try {
        const result = await TestResult.findById(req.params.resultId)
            .populate('test');
        
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        if (result.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;