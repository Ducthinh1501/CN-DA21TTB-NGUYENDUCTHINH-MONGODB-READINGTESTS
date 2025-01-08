const ReadingTest = require('../models/ReadingTest');

const testData = [
  {
    title: "Climate Change Impact",
    description: "A passage about global warming effects",
    passage: "Climate change is one of the most pressing issues...",
    timeLimit: 20,
    difficulty: "medium",
    category: "Environment",
    questions: [
      {
        questionText: "Global temperatures have risen by 2°C.",
        correctAnswer: "false",
        explanation: "The passage mentions 1°C rise, not 2°C"
      },
      {
        questionText: "Renewable energy is discussed in the passage.",
        correctAnswer: "true",
        explanation: "The passage mentions renewable energy sources"
      }
    ]
  }
];

const seedTests = async () => {
  try {
    await ReadingTest.deleteMany();
    await ReadingTest.insertMany(testData);
    console.log('Test data seeded successfully');
  } catch (error) {
    console.error('Error seeding test data:', error);
  }
};

module.exports = seedTests;