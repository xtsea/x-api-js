/*
Credits @xpushz on telegram 
Copyright 2017-2025 (c) Randy W @xtdevs, @xtsea on telegram
from : https://github.com/TeamKillerX
Channel : @RendyProjects
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import * as config from '../config.js';

const GeminiRoutes = express.Router();

const genAI = new GoogleGenerativeAI(config.GoogleAPIKey);

/**
 * @param {string} prompt - The input string for the model.
 * @param {string} setModel - you can change the model
 * @returns {Promise<string>} The generated response text.
 */
async function GeminiResponse(prompt, setModel) {
    try {
        const model = genAI.getGenerativeModel({
            model: setModel,
        });
        const result = await model.generateContent(prompt);
        const text = result.response.candidates[0]?.content;
        return text.parts[0].text || "No response content";
    } catch (e) {
        console.error(`Error in GeminiResponse: ${e.message}`);
        return "Error generating response.";
    }
}

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: Artificial intelligence endpoint to interact with AI, like chatting.
 */

/**
 * @swagger
 * /api/v1/google-gemini:
 *   get:
 *     summary: Get a response from Google Gemini API
 *     tags: [AI]
 *     description: This endpoint interacts with the Google Gemini API to fetch a response based on the query and model.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: The query to be processed by the Google Gemini API.
 *         schema:
 *           type: string
 *       - in: query
 *         name: setmodel
 *         required: false
 *         description: The model version to use (default is "gemini-1.5-flash").
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response containing the API result.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The result from the Gemini API.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
GeminiRoutes.get("/api/v1/google-gemini", async (req, res) => {
    try {
        const query = req.query.query;
        const setmodel = req.query.setmodel || "gemini-1.5-flash";
        const results = await GeminiResponse(query, setmodel);
        res.json({ message: results });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export { GeminiRoutes };
