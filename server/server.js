const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Khởi tạo express app
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // URL của React client
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Reading Test API',
            version: '1.0.0',
            description: 'API documentation for Reading Test project',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        username: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                        role: { type: 'string', enum: ['user', 'admin'] },
                    },
                },
                ReadingTest: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        passage: { type: 'string' },
                        timeLimit: { type: 'number' },
                        difficulty: { type: 'string' },
                        category: { type: 'string' },
                        isActive: { type: 'boolean' },
                    },
                },
                TestAttempt: {
                    type: 'object',
                    properties: {
                        userId: { type: 'string' },
                        testId: { type: 'string' },
                        startTime: { type: 'string', format: 'date-time' },
                        endTime: { type: 'string', format: 'date-time' },
                        score: { type: 'number' },
                        totalQuestions: { type: 'number' },
                        correctAnswers: { type: 'number' },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Đường dẫn tới các file chứa định nghĩa API
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Import routes
const userRoutes = require('./routes/users');
const testRoutes = require('./routes/tests');
const attemptRoutes = require('./routes/attempts');
const adminRoutes = require('./routes/admin');
// Route mặc định
app.get('/', (req, res) => {
    res.send('Reading Test API is running');
});

// Sử dụng routes
app.use('/api/users', userRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Something went wrong!',
        error: err.message 
    });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/reading-test')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Xử lý unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Xử lý uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

module.exports = app;