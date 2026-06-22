const express = require('express');
const router = express.Router();
const { uploadReport, getMyReports, getReportById } = require('../controllers/reportController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/upload', verifyToken, upload.single('report'), uploadReport);
router.get('/history', verifyToken, getMyReports);
router.get('/:id', verifyToken, getReportById);

module.exports = router;