const axios = require('axios');

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
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponseText = response.data.choices[0].message.content;
    const parsed = JSON.parse(aiResponseText);
    return parsed;
  } catch (err) {
    console.error('Groq analysis error:', err.response?.data || err.message);
    throw new Error('Failed to analyze report with AI.');
  }
};

module.exports = { analyzeReport };
