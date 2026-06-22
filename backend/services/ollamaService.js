const axios = require('axios');

const OLLAMA_URL = 'http://localhost:11434/api/generate';

const analyzeReport = async (reportText) => {
  const prompt = `You are a medical assistant helping a patient understand their report.

Here is the report content:
${reportText}

Respond ONLY in valid JSON format, no extra text, with this exact structure:
{
  "summary": "A 3-4 sentence plain language explanation of the overall report",
  "flags": [
    {
      "parameter": "name of the test value",
      "value": "the actual value with units",
      "normal_range": "the normal range",
      "status": "high or low or normal",
      "concern": "brief explanation of what this might mean"
    }
  ],
  "questions": [
    "Question 1 to ask the doctor",
    "Question 2 to ask the doctor",
    "Question 3 to ask the doctor"
  ]
}

Only include parameters in "flags" that are abnormal (high or low). If everything is normal, return an empty array for flags.`;

  try {
    const response = await axios.post(OLLAMA_URL, {
      model: 'llama3.2',
      prompt: prompt,
      stream: false,
      format: 'json',
    });

    const aiResponseText = response.data.response;
    const parsed = JSON.parse(aiResponseText);

    return parsed;
  } catch (err) {
    console.error('Ollama analysis error:', err.message);
    throw new Error('Failed to analyze report with AI.');
  }
};

module.exports = { analyzeReport };