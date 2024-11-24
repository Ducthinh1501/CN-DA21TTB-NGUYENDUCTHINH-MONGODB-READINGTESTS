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
    const { answers } = req.body;
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({
        message: 'Không tìm thấy bài test'
      });
    }

    // Tính điểm
    let score = 0;
    const results = test.questions.map((question, index) => {
      const isCorrect = answers[question._id] === question.correctAnswer;
      if (isCorrect) score++;
      return {
        question: question.questionText,
        userAnswer: answers[question._id],
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      };
    });

    // Tính điểm theo thang 10
    const finalScore = (score / test.questions.length) * 10;

    // Cập nhật điểm trung bình của bài test
    await test.updateAverageScore(finalScore);

    // Lưu kết quả vào lịch sử của user
    req.user.testResults.push({
      test: test._id,
      score: finalScore,
      answers: results
    });
    await req.user.save();

    res.status(200).json({
      message: 'Nộp bài thành công',
      data: {
        score: finalScore,
        total: test.questions.length,
        correct: score,
        results
      }
    });
  } catch (error) {
    res.status(400).json({
      message: 'Nộp bài thất bại',
      error: error.message
    });
  }
};
