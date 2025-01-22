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

import express from 'express';
import {OpenaiRes} from '../lib/scrapper.js';
const GptRoutes = express.Router();

/**
 * @swagger
 * /api/v1/ai/gpt-old:
 *   get:
 *     summary: GPT OLD version turbo
 *     tags: [AI]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: The query to be processed by the GPT OLD.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
GptRoutes.get('/api/v1/ai/gpt-old', async (req, res) => {
    try {
        const query = req.query.query;
        const results = await OpenaiRes(query);
        res.json({ results });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

export { GptRoutes };
