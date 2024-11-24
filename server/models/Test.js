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
  timeLimit: {
    type: Number,
    required: true
  },
  passage: {
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
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Test', testSchema);