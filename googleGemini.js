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

import * as config from './config.js';

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
        console.error(`Error: ${e.message}`);
        return "Error generating response.";
    }
}

export { GeminiResponse };
