require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

async function testConnection() {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connection successful!');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

testConnection();
