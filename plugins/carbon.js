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

import { ParametersUrl } from '../lib/scrapper.js';
import fetch from "node-fetch";
import express from 'express';
import { Readable } from "stream";
import sharp from "sharp";

const CarbonRoutes = express.Router();

/**
 * Encode the query parameter.
 * @param {string} code - The code to be encoded.
 * @returns {string} Encoded query parameter string.
 */
function paramCode(code) {
    const params = new URLSearchParams({ code: code });
    return params.toString();
}

/**
 * Fetch the carbon image using the provided code.
 * @param {string} args - The code to be processed.
 * @returns {Promise<Buffer|null>} The image as a Buffer, or null if an error occurs.
 */
async function MakerCarbon(args) {
    const url = ParametersUrl("maker/carbon");
    try {
        const params = paramCode(args);
        const finalUrl = `${url}?${params}`;
        const response = await fetch(finalUrl, {
            method: "GET",
        });

        if (!response.ok) {
            console.error(`API Error: ${response.status}`);
            return null;
        }

        return await response.arrayBuffer();
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}

/**
 * API route for processing carbon images.
 * @swagger
 * /api/v1/maker/carbon:
 *   get:
 *     summary: Generate a carbon image
 *     description: Processes a code snippet into a styled image.
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: The code to be processed.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successfully processed image.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing query parameter.
 *       500:
 *         description: Internal server error.
 */
CarbonRoutes.get("/api/v1/maker/carbon", async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) {
            return res.status(400).send("Query parameter 'code' is missing");
        }

        const imageBytes = await MakerCarbon(code);
        if (!imageBytes) {
            return res.status(500).json({ error: "Failed to fetch image bytes" });
        }

        const buffer = Buffer.isBuffer(imageBytes) ? imageBytes : Buffer.from(imageBytes);

        const processedImage = await sharp(buffer).jpeg().toBuffer();
        res.set("Content-Type", "image/jpeg");
        Readable.from(processedImage).pipe(res);
    } catch (error) {
        console.error("Error processing image:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

export { CarbonRoutes };
