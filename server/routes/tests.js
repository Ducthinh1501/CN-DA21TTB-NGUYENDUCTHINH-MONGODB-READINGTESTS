const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Test = require('../models/Test');
const TestResult = require('../models/TestResult');
const mongoose = require('mongoose');

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
        console.log('Fetching all tests...');
        
        // Kiểm tra xem có tests trong database không
        const count = await Test.countDocuments({ isActive: true });
        console.log('Total active tests:', count);

        const tests = await Test.find({ isActive: true });
        console.log('Tests found:', tests.length);

        // Log chi tiết về mỗi test
        tests.forEach(test => {
            console.log('Test:', {
                id: test._id,
                title: test.title,
                category: test.category,
                difficulty: test.difficulty
            });
        });

        if (!tests || tests.length === 0) {
            console.log('No reading tests found in database');
            return res.status(404).json({ message: 'No tests found' });
        }

        res.json(tests);
    } catch (err) {
        console.error('Error in GET /tests:', {
            error: err.message,
            stack: err.stack
        });
        res.status(500).json({ 
            message: 'Error fetching reading tests',
            error: err.message 
        });
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
        console.log('Attempting to fetch test with ID:', req.params.id);

        if (!req.params.id) {
            console.log('Invalid test ID provided');
            return res.status(400).json({ message: 'Invalid test ID' });
        }

        let test = null;
        const testId = req.params.id;

        // Thử các cách tìm khác nhau
        try {
            // Cách 1: Tìm với ID gốc
            test = await mongoose.connection.db
                .collection('readingtests')
                .findOne({ _id: testId });

            // Cách 2: Nếu không tìm thấy, thử với ObjectId
            if (!test && mongoose.Types.ObjectId.isValid(testId)) {
                test = await mongoose.connection.db
                    .collection('readingtests')
                    .findOne({ _id: new mongoose.Types.ObjectId(testId) });
            }

            // Cách 3: Thử với string
            if (!test) {
                test = await mongoose.connection.db
                    .collection('readingtests')
                    .findOne({ _id: testId.toString() });
            }

        } catch (searchError) {
            console.error('Error during test search:', searchError);
        }

        // Log chi tiết kết quả tìm kiếm
        console.log('Search results:', {
            searchId: testId,
            found: !!test,
            testInfo: test ? {
                id: test._id,
                title: test.title,
                type: typeof test._id,
                hasQuestions: Array.isArray(test.questions),
                questionCount: test.questions?.length || 0
            } : null
        });

        if (!test) {
            return res.status(404).json({ 
                message: 'Test not found',
                requestedId: testId
            });
        }

        // Validate test structure
        if (!test.questions || !Array.isArray(test.questions)) {
            console.error('Invalid test structure:', {
                id: test._id,
                hasQuestions: !!test.questions,
                questionsType: typeof test.questions
            });
            return res.status(500).json({ 
                message: 'Invalid test structure',
                error: 'Test questions not found or invalid'
            });
        }

        res.json(test);

    } catch (err) {
        console.error('Error fetching test details:', {
            error: err.message,
            stack: err.stack,
            testId: req.params.id
        });
        res.status(500).json({ 
            message: 'Error fetching test details',
            error: err.message 
        });
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
        const testId = req.params.id;
        console.log('Processing test submission for ID:', testId);

        // Chuyển đổi string ID thành ObjectId
        const objectId = new mongoose.Types.ObjectId(testId);
        
        // Tìm test với ObjectId
        const test = await mongoose.connection.db
            .collection('readingtests')
            .findOne({ _id: objectId });

        console.log('Found test:', {
            id: testId,
            found: !!test,
            title: test?.title
        });

        if (!test) {
            return res.status(404).json({ 
                message: 'Test not found',
                requestedId: testId 
            });
        }

        const { answers } = req.body;
        if (!Array.isArray(answers)) {
            console.log('Invalid answers format:', answers);
            return res.status(400).json({ message: 'Invalid answers format' });
        }

        // Calculate score
        let correctCount = 0;
        const answersDetails = test.questions.map((question, index) => {
            const userAnswer = answers[index] || '';
            const isCorrect = userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
            if (isCorrect) correctCount++;
            
            return {
                questionText: question.questionText,
                userAnswer: userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect,
                explanation: question.explanation
            };
        });

        const score = Math.round((correctCount / test.questions.length) * 100);

        // Log kết quả
        console.log('Test submission results:', {
            testId: testId,
            score,
            correctCount,
            totalQuestions: test.questions.length
        });

        // Lưu kết quả test (nếu cần)
        const testResult = {
            user: req.user.id,
            test: objectId,
            score: score,
            answers: answersDetails,
            completedAt: new Date()
        };

        await mongoose.connection.db
            .collection('testresults')
            .insertOne(testResult);

        // Send response
        res.json({ 
            score,
            details: answersDetails,
            totalQuestions: test.questions.length,
            correctAnswers: correctCount,
            message: 'Test submitted successfully'
        });

    } catch (err) {
        console.error('Error submitting test:', {
            error: err.message,
            stack: err.stack,
            testId: req.params.id
        });
        res.status(500).json({ 
            message: 'Failed to submit test',
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