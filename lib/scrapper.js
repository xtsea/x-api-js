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

import axios from 'axios';
import * as cheerio from 'cheerio';

import { GptModelOld } from '../models.js';

const ParametersUrl = function (parameters) {
    const HackIdk = atob("aHR0cHM6Ly9pdHpwaXJlLmNvbS8=");
    const WhatDoesThis = `${HackIdk}${parameters}`;
    return WhatDoesThis
};

const Copilot2Trip = async (query) => {
    try {
        const url = ParametersUrl("ai/copilot2trip");
        const response = await axios.get(url, {
          params: {
            q: query
          },
        });
        if (typeof response.data === "object") {
            response.data.author = "xtdevs";
            return response.data;
        } else {
            console.log("the return value was not a json object");
            return null;
        }
    } catch (e) {
        console.error("Error:", e.message);
        return null;
    }
};

const GempaBumi = async () => {
    try {
        const url = ParametersUrl("information/gempa-warning");
        const response = await axios.get(url);
        if (typeof response.data === "object") {
            response.data.author = "xtdevs";
            return response.data;
        } else {
            console.log("the return value was not a json object");
            return null;
        }
    } catch (e) {
        console.error("Error:", e.message);
        return null;
    }
};

const OpenaiRes = async (prompt) => {
    try {
        const EncodeUrl = "aHR0cHM6Ly9vcGVuYWktZ3B0LnJlbWl4cHJvamVjdC5vcmcv"
        let url;
        try {
           url = atob(EncodeUrl);
        } catch (e) {
            console.error("Could not decode the string! " + e);
        }
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "en",
            "Connection": "keep-alive",
            "Origin": "https://remix.ethereum.org",
            "Referer": "https://remix.ethereum.org/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134"
        };
        const response = await axios.post(url, GptModelOld(prompt), { headers, timeout: 50000 });
        if (response.status === 200) {
          return response.data.choices[0].message.content + "\n\nPowered By xtdevs";
        }
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
};

const RendyDevX = async () => {
    try {
        const url = "https://raw.githubusercontent.com/TeamKillerX/akenoai-lib/refs/heads/main/devs.json";
        const response = await axios.get(url);
        return response.data.admin_dev.tembakgambar;
    } catch (error) {
        console.error(error);
        return null
    }
};

async function tebakgambar() {
  try {
    const url = await RendyDevX()
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const randomNum = Math.floor(Math.random() * (2836 - 2 + 1)) + 2; // Random between 2 and 2836
    const selectedItem = $(`#images > li:nth-child(${randomNum}) > a`);

    if (selectedItem.length > 0) {
      const img = 'https://jawabantebakgambar.net' + selectedItem.find('img').attr('data-src');
      const jwb = selectedItem.find('img').attr('alt');

      const result = {
        message: "By Randydev",
        image: img,
        jawaban: jwb
      };

      return result;
    } else {
      throw new Error("Selected item not found.");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function AnimeHentai() {
  try {
    const page = Math.floor(Math.random() * 1153) + 1;
    const url = `https://sfmcompile.club/page/${page}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const hasil = [];
    const articles = $('#primary > div > div > ul > li > article');

    articles.each((index, article) => {
      const title = $(article).find('header > h2').text();
      const link = $(article).find('header > h2 > a').attr('href');
      const category = $(article)
        .find('header > div.entry-before-title > span > span')
        .text()
        .replace('in ', '');
      const share_count = $(article).find('header > div.entry-after-title > p > span.entry-shares').text();
      const views_count = $(article).find('header > div.entry-after-title > p > span.entry-views').text();
      const type = $(article).find('source').attr('type') || 'image/jpeg';
      const video_1 = $(article).find('source').attr('src') || $(article).find('img').attr('data-src');
      const video_2 = $(article).find('video > a').attr('href') || '';
      hasil.push({
        title,
        link,
        category,
        share_count,
        views_count,
        type,
        video_1,
        video_2,
      });
    });

    if (hasil.length === 0) {
      return { developer: '@xtdevs', error: 'no result found' };
    }

    return hasil;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export { 
  OpenaiRes,
  tebakgambar,
  AnimeHentai,
  GempaBumi,
  Copilot2Trip,
  ParametersUrl
};
