const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(express.json());

// CORS setup (allow all for now, restrict in production)
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Helmet security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);

// Import Routes
const visitRoutes = require('./routes/visits');
const noteRoutes = require('./routes/notes');
const doctorRoutes = require('./routes/doctors');
const healthRoutes = require('./routes/health');
const pregnancyRoutes = require('./routes/pregnancy');

// Use Routes
app.use('/api/v1/visits', visitRoutes);
app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/pregnancy', pregnancyRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hi From Pregnancy API v1' });
});

// Define port and host
const PORT = process.env.PORT || 8001;
const HOST = process.env.HOST || '0.0.0.0';

// DB connect + server start
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, HOST, () =>
      console.log(`Server running at http://${HOST}:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('DB Connection Failed:', err.message);
    process.exit(1);
  });

// Export the app for testing
module.exports = app;
