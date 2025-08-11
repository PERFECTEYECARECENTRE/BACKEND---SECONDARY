const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const genAI = new GoogleGenerativeAI('AIzaSyCx-L3JDyvolcAticALX-ASPDfNDYH44Wk');

router.get('/getPatientAI', async (req, res) => {
    try {
        console.log("its called");
        const { data } = req.query;

        if (!data) {
            return res.status(400).json({ error: "No patient data provided" });
        }

        const model = await genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

        // Build the complete prompt with data included
        const prompt = `
I will provide a patient's data in JSON format. Please interpret it accordingly, focusing mainly on the eye prescription values (eye numbers). Based on the data, generate a short and concise medical report.

Patient Data (JSON):
${data}
`;

        const result = await model.generateContent(prompt);

        const rawText = result.response.text() || "Default Data";
const plainText = rawText.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold markdown

        console.log(plainText);

        res.status(200).json(plainText);

    } catch (error) {
        console.error("Error generating data:", error);
        res.status(500).json({ error: "Error generating data" });
    }
});

module.exports = router;
