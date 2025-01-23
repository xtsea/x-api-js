import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.DB_URI;
const GoogleAPIKey = process.env.GOOGLE_API_KEY;
const BotToken = process.env.BOT_TOKEN;
const IsTelegramBot = false;

if (IsTelegramBot) {
  if(!BotToken) {
    throw new Error("Required `BOT_TOKEN` ");
  }
}

if (!dbUri && !GoogleAPIKey) {
    throw new Error("Missing variables required");
}

export {
  dbUri,
  GoogleAPIKey,
  BotToken,
  IsTelegramBot
};
