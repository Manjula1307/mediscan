const fs = require('fs');
const { PDFParse } = require('pdf-parse');
const db = require('../config/db');
const { analyzeReport } = require('../services/ollamaService');

// POST /api/reports/upload
const uploadReport = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    // Step 1 — Read the PDF file from disk
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    // Step 2 — Extract text from the PDF using the new v2 class-based API
    const parser = new PDFParse({ data: dataBuffer });
    const result = await parser.getText();
    const reportText = result.text;
    await parser.destroy(); // releases internal resources, important for v2

    if (!reportText || reportText.trim().length < 20) {
      return res.status(400).json({ message: 'Could not extract readable text from this PDF.' });
    }

    // Step 3 — Send to Ollama for AI analysis
    const analysis = await analyzeReport(reportText);

    // Step 4 — Save everything to database
    const [result2] = await db.query(
      `INSERT INTO reports (user_id, filename, file_path, ai_summary, ai_flags, ai_questions) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        req.file.originalname,
        filePath,
        analysis.summary,
        JSON.stringify(analysis.flags),
        JSON.stringify(analysis.questions),
      ]
    );

    // Step 5 — Send response back to frontend
    res.status(201).json({
      message: 'Report analyzed successfully.',
      report: {
        id: result2.insertId,
        filename: req.file.originalname,
        summary: analysis.summary,
        flags: analysis.flags,
        questions: analysis.questions,
      },
    });
  } catch (err) {
    console.error('Upload report error:', err);
    res.status(500).json({ message: err.message || 'Failed to process report.' });
  }
};

// GET /api/reports/history
const getMyReports = async (req, res) => {
  try {
    const [reports] = await db.query(
      `SELECT id, filename, ai_summary, created_at 
       FROM reports 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.status(200).json({ reports });
  } catch (err) {
    console.error('Get reports error:', err);
    res.status(500).json({ message: 'Server error while fetching reports.' });
  }
};

// GET /api/reports/:id
const getReportById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM reports WHERE id = ? AND user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Report not found.' });
    }

    const report = rows[0];

    // Parse the JSON strings back into real objects/arrays
    report.flags = JSON.parse(report.ai_flags || '[]');
    report.questions = JSON.parse(report.ai_questions || '[]');

    res.status(200).json({ report });
  } catch (err) {
    console.error('Get report by id error:', err);
    res.status(500).json({ message: 'Server error while fetching report.' });
  }
};

module.exports = { uploadReport, getMyReports, getReportById };