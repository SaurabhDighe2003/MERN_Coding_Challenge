const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const transactionRoutes = require('./routes/transactionRoutes');

// Routes
app.use('/api', transactionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log('✅ MongoDB Connected');
  // Start the server after DB is connected
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})
.catch(err => console.error('❌ MongoDB connection error:', err));
