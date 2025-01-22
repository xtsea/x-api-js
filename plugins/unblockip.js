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
import { Database } from '../database/database.js';
const UnblockIpRoutes = express.Router();

UnblockIpRoutes.get('/api/v1/unblock-ip', async (req, res) => {
    const dbClient = new Database("AkenoXJs", "FastJsAPI");
    try {
        const ip = req.query.ip;
        const results = await dbClient.UnblockedIp(ip);
        res.json({ message: "successfully ip unbanned"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { UnblockIpRoutes };
