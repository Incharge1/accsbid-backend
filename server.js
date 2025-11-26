// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected ✅'))
  .catch(err => {
    console.error('MongoDB connection error ❌', err);
    process.exit(1); // Stop server if DB connection fails
  });

// Test route
app.get('/test-db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ status: 'success', collections });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Example route for login/signup placeholder
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
