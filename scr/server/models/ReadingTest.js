const mongoose = require('mongoose');

const readingTestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
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
    correctAnswer: {
      type: String,
      enum: ['true', 'false', 'not given']
    },
    explanation: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('ReadingTest', readingTestSchema);