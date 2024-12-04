const connectDB = require('./config/db');
const seedTests = require('./seeds/testData');

connectDB().then(() => {
  seedTests().then(() => {
    console.log('Database seeded!');
    process.exit();
  });
});
