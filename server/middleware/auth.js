const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    // 1. Kiểm tra token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Vui lòng đăng nhập để truy cập'
      });
    }

    // 2. Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Kiểm tra user còn tồn tại không
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: 'Token không hợp lệ'
      });
    }

    // 4. Gán user vào request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Không có quyền truy cập'
    });
  }
};

// Middleware kiểm tra role admin
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Bạn không có quyền thực hiện hành động này'
      });
    }
    next();
  };
};