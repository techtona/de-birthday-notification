import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_DATABASE;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = "postgres";
const dbPassword = process.env.DB_PASSWORD;
const appDebug = process.env.APP_DEBUG === "true" || false;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: appDebug
});

export default sequelize;
