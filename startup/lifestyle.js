import { Database } from '../database/database.js';
import { InitBot } from '../bot/telegrambot.js';
import { IsTelegramBot } from '../config.js';
const port = 7860

const startup = async () => {
    try {
        if (IsTelegramBot) {
          await InitBot();
        }
        const dbClient = new Database("AkenoXJs", "FastJsAPI");
        console.log("Starting application...");
        await dbClient.connect();
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("Error during startup:", error.message);
        process.exit(1);
    }
};

const startServer = async (app) => {
    await startup();
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
};

export { startServer };
