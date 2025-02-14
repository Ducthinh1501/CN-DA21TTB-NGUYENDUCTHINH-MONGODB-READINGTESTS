const Test = require('../models/Test');

// Lấy danh sách bài test
exports.getTests = async (req, res) => {
  try {
    const tests = await Test.find({ isActive: true })
      .select('title description timeLimit difficulty category attempts averageScore');
    
    res.status(200).json({
      message: 'Lấy danh sách bài test thành công',
      data: tests
    });
  } catch (error) {
    res.status(400).json({
      message: 'Lấy danh sách bài test thất bại',
      error: error.message
    });
  }
};

// Lấy chi tiết một bài test
exports.getTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    
    if (!test) {
      return res.status(404).json({
        message: 'Không tìm thấy bài test'
      });
    }

    res.status(200).json({
      message: 'Lấy chi tiết bài test thành công',
      data: test
    });
  } catch (error) {
    res.status(400).json({
      message: 'Lấy chi tiết bài test thất bại',
      error: error.message
    });
  }
};

// Nộp bài test
exports.submitTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
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

    // Tính điểm với 2 số thập phân
    const score = Number(((correctCount / test.questions.length) * 100).toFixed(4));
    console.log('Calculated score:', score);

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
};
