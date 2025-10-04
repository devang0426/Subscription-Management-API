import { config } from "dotenv";

// Load environment variables from the correct .env file
config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`
});

// Destructure the PORT from process.env
export const { PORT,NODE_ENV,DB_URI ,JWT_SECRET,JWT_EXPIRES_IN , ARCJET_key,ARCJET_env,QSTASH_TOKEN,QSTASH_URL} = process.env;
