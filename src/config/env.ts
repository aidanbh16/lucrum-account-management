import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || 8080,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
    DEV_DATABASE_URL: process.env.DEV_DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
};