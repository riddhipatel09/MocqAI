const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// Routes
const authRoutes = require('./routes/auth');
const geminiRoute = require('./routes/gemini');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// ✅ Mount at correct base paths
app.use('/api/auth', authRoutes);
app.use('/api/gemini', geminiRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🔥 server.js started');
  console.log('🚀 Server running on http://localhost:' + PORT);
});
