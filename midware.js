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

import { Database } from './database.js';

class CheckMilWare {
  constructor() {
    this.dbClient = new Database("AkenoXJs", "FastJsAPI");
  }

  async handle(req, res, next) {
    try {
      const xForwardedFor = req.headers['x-forwarded-for'];
      const xRealIP = req.headers['x-real-ip'];
      const cfConnectingIP = req.headers['cf-connecting-ip'];
      let realIP = req.ip;

      if (xForwardedFor) {
        realIP = xForwardedFor.split(',')[0].trim();
      } else if (xRealIP) {
        realIP = xRealIP;
      } else if (cfConnectingIP) {
        realIP = cfConnectingIP;
      }

      req.realIP = realIP;

      console.log(`Extracted Real IP: ${realIP}`);

      const isBlocked = await this.dbClient.CheckIsBlocked(realIP);
      if (isBlocked && isBlocked.blocked === true) {
        return res.status(403).send("Access denied: IP is blocked");
      }

      if (req.path === '/.env') {
        console.log("Check path /env");
        await this.dbClient.AddIpisBlocked(realIP);
        return res.status(403).send("Access denied: IP is blocked..");
      }
      console.log(`Real IP address is: ${realIP}, header used: ${xForwardedFor ? "x-forwarded-for" : xRealIP ? "x-real-ip" : cfConnectingIP ? "cf-connecting-ip" : "req.ip"}`);

      next();
    } catch (error) {
      console.error("Error in middleware: " + error);
      res.status(500).send("Something bad happened");
    }
  }
}

export { CheckMilWare };
