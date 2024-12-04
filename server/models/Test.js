const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    passage: {
        type: String,
        required: true
    },
    timeLimit: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        correctAnswer: {
            type: String,
            required: true
        },
        explanation: {
            type: String,
            required: true
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Test', TestSchema, 'readingtests'); 