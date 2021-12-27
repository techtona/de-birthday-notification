import dotenv from "dotenv";
import {createConnection} from "typeorm";
import app from "./src/app";
import logger from "./src/helpers/logger";
import redis from "./src/helpers/redis";

dotenv.config();

// mysql health check
createConnection({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    synchronize: true,
    type: "postgres",
    entities: [
        __dirname + "/entity/*.js",
    ],
}).then((connection) => {
    logger.info("Psql Connected");
    connection.close();
}).catch((error) => logger.error(error));

const port = process.env.APP_PORT || 8080;

app.listen(port, () => {
    logger.info( `server is listening on ${port}`);
});
