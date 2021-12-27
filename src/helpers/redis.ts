import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export default new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");
