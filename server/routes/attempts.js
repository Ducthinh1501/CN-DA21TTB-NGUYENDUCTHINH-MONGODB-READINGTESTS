const express = require('express');
const router = express.Router();
const TestAttempt = require('../models/TestAttempt');

/**
 * @swagger
 * /api/attempts:
 *   get:
 *     summary: Get all test attempts
 *     tags: [Attempts]
 *     responses:
 *       200:
 *         description: List of all attempts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   testId:
 *                     type: string
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                   score:
 *                     type: number
 *                   totalQuestions:
 *                     type: number
 *                   correctAnswers:
 *                     type: number
 */
router.get('/', async (req, res) => {
    try {
        const attempts = await TestAttempt.find()
            .populate('userId')
            .populate('testId');
        res.json(attempts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/attempts:
 *   post:
 *     summary: Create a new test attempt
 *     tags: [Attempts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               testId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attempt created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', async (req, res) => {
    const attempt = new TestAttempt({
        userId: req.body.userId,
        testId: req.body.testId,
        startTime: new Date(),
        answers: [],
        score: 0,
        totalQuestions: 5,
        correctAnswers: 0
    });

    try {
        const newAttempt = await attempt.save();
        res.status(201).json(newAttempt);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;