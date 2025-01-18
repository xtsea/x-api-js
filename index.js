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
import * as cheerio from 'cheerio';
import * as lifestyle from './startup/lifestyle.js';

import { Readable } from "stream";
import { CheckMilWare } from './middleware/midware.js';
import { setup, serve } from './swagger.js';
import { swaggerOptions } from './settingOptions.js';

import sharp from "sharp";
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';

// routes
import { GeminiRoutes } from './routes/googleGemini.js';

const CheckMilWares = new CheckMilWare();

app.disable("x-powered-by");
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routes
app.use(GeminiRoutes);

const specs = swaggerJsDoc(swaggerOptions);

app.use(
  '/docs',
  serve,
  setup(specs, {
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .opblock .opblock-summary-path {
        display: inline-block;
        word-break: break-word;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }
    `,
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css",
    customSiteTitle: 'AkenoXJs'
  })
);

app.get('/', (req, res) => {
  res.redirect('https://t.me/RendyProjects');
});

app.use(async (req, res, next) => {
    await CheckMilWares.handle(req, res, next);
});

lifestyle.startServer(app);
