const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
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
        questionText: String,
        correctAnswer: String,
        explanation: String
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { 
    collection: 'readingtests',
    versionKey: false
});

module.exports = mongoose.model('Test', testSchema); 