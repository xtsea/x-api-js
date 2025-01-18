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
const app = express();

import * as swaggerUi from 'swagger-ui-express';
import * as openapiSpecification from './swagger.js';
import * as cheerio from 'cheerio';
import * as lifestyle from './lifestyle.js';

import sharp from "sharp";
import { Readable } from "stream";
import bodyParser from 'body-parser';
import { GeminiResponse } from './googleGemini.js';
import { CheckMilWare } from './midware.js';

const CheckMilWares = new CheckMilWare();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.redirect('https://t.me/RendyProjects');
});

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openapiSpecification);
});

app.use(async (req, res, next) => {
    await CheckMilWares.handle(req, res, next);
});

app.get("/api/v1/google-gemini", async (req, res) => {
    try {
        const query = req.query.query;
        const setmodel = req.query.setmodel || "gemini-1.5-flash"
        const results = await GeminiResponse(query, setmodel);
        res.json({ message: results });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

lifestyle.startServer(app);
