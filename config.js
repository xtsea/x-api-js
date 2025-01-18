import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.DB_URI;
const GoogleAPIKey = process.env.GOOGLE_API_KEY;

if (!dbUri && !GoogleAPIKey) {
    throw new Error("Missing variables required");
}

export {
  dbUri,
  GoogleAPIKey
};
