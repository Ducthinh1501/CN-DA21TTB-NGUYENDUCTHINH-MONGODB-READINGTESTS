const express = require('express');
const router = express.Router();
const Test = require('../models/Test');

// Get all tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find({})
      .select('title description difficulty category timeLimit') // Chỉ lấy các trường cần thiết
      .sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get test by ID
router.get('/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(test);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;