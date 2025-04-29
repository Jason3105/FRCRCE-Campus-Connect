const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const councilRoutes = require('./routes/councils');
const teamRoutes = require('./routes/teams');
const galleryRoutes = require('./routes/gallery');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully via Shell'))
  .catch(err => {
    console.error('MongoDB shell connection error:', err);
    process.exit(1); // Exit process with failure
  });

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'], // Adjust these origins if necessary
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/councils', councilRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/gallery', galleryRoutes);

// Basic route for API health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

// Hosting Requirements
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const eventRoutes = require('./routes/events');
// const councilRoutes = require('./routes/councils');
// const teamRoutes = require('./routes/teams');
// const galleryRoutes = require('./routes/gallery');

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI;

// // MongoDB Connection
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     console.log('MongoDB connected successfully!');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

// // Allow requests from your frontend domain
// const allowedOrigins = ['https://frcrcecampusconnect.onrender.com','http://localhost:5173'];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://frcrcecampusconnect.onrender.com'], // Links frontend
//   credentials: true
// }));
// app.use(express.json());

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/councils', councilRoutes);
// app.use('/api/teams', teamRoutes);
// app.use('/api/gallery', galleryRoutes);

// // Health Check Route
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'Server is running' });
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error('Server error:', err.stack);
//   res.status(500).json({
//     message: 'Server error',
//     error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// module.exports = app;
