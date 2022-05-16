import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.POSTGRES_DATABASE;
const dbUser = process.env.POSTGRES_USER;
const dbHost = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT;
const dbDriver = "postgres";
const dbPassword = process.env.POSTGRES_PASSWORD;
const appDebug = process.env.APP_DEBUG === "true" || false;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: appDebug,
    port:  Number(dbPort)
});

export default sequelize;
