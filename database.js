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

import { MongoClient } from 'mongodb';
import * as config from './config.js';

const client = new MongoClient(config.dbUri);

class Database {
    constructor(dbname, collectionName) {
        this.dbname = dbname;
        this.collectionName = collectionName;
    }

    async connect() {
        try {
            if (!client.isConnected) {
                await client.connect();
                console.log("Connected to MongoDB");
            }
        } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
        }
    }

    collection() {
        try {
            const db = client.db(this.dbname);
            return db.collection(this.collectionName);
        } catch (error) {
            console.error("Error accessing collection:", error.message);
        }
    }

    async close() {
        try {
            await client.close();
            console.log("MongoDB connection closed");
        } catch (error) {
            console.error("Error closing MongoDB connection:", error.message);
        }
    }

    async IPAddressAndUpdate(ip) {
        try {
            const collection = this.collection();
            const filter = { ip: ip };
            const update = { $set: { ip: ip } };

            const result = await collection.updateOne(filter, update, { upsert: true });

            if (result.upsertedCount > 0) {
                console.log("Inserted a new IP address:", ip);
            } else {
                console.log("Updated an existing IP address:", ip);
            }
        } catch (error) {
            console.error("Error updating IP address:", error.message);
        }
    }

    async AddIpisBlocked(ip) {
        try {
            const collection = this.collection();
            const filter = { ip: ip };
            const update = { $set: { blocked: true } };

            const result = await collection.updateOne(filter, update, { upsert: true });

            if (result.upsertedCount > 0) {
                console.log("Inserted a new IP address:", ip);
            } else {
                console.log("Updated an existing IP address:", ip);
            }
        } catch (error) {
            console.error("Error updating IP address:", error.message);
        }
    }

    async CheckIsBlocked(ip) {
        try {
            const collection = this.collection();
            const filter = { ip: ip };
            const update = { $set: { blocked: true } };

            const FindIp = await collection.findOne(filter);

            if (FindIp) {
                console.log("IP found in the database:", FindIp);
                return FindIp;
            } else {
                console.log("IP not found in the database");
                return null
            }
        } catch (error) {
            console.error("Error checking IP:", error.message);
            return null
        }
    }
};

export { Database };
