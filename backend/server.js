// ============================================
// 1. IMPORTS — bringing in what we need
// ============================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// ============================================
// 2. LOAD ENVIRONMENT VARIABLES
// ============================================

dotenv.config();

// ============================================
// 3. IMPORT ROUTES
// ============================================

const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');

// ============================================
// 4. CREATE THE EXPRESS APP
// ============================================

const app = express();

// ============================================
// 5. MIDDLEWARE — runs on EVERY request
// ============================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// 6. SERVE UPLOADED FILES STATICALLY
// ============================================

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================
// 7. CONNECT ROUTES
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// ============================================
// 8. HEALTH CHECK ROUTE
// ============================================

app.get('/', (req, res) => {
  res.json({ 
    message: '🏥 MediScan API is running',
    status: 'healthy'
  });
});

// ============================================
// 9. 404 HANDLER — unknown routes
// ============================================

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.url} not found` });
});

// ============================================
// 10. GLOBAL ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ 
    message: 'Something went wrong on the server.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================
// 11. START THE SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🏥 MediScan server running on http://localhost:${PORT}`);
});