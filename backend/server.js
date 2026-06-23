const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Allow requests from the Vercel frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: '🏥 MediScan API is running',
    status: 'healthy'
  });
});

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.url} not found` });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ 
    message: 'Something went wrong on the server.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🏥 MediScan server running on port ${PORT}`);
});
