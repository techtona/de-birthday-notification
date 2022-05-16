import dotenv from "dotenv";
import express from "express";
import routes from "./frameworks/http/routes";
import connection from "./frameworks/database/postgres/connection"

import {createConnection} from "typeorm";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

//definer the routes
app.use("/", routes);

let option = {
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    synchronize: true,
    type: "postgres",
    entities: [
        __dirname + "/entity/*.js",
    ],
}
// postgres connect connect
connection.connect(createConnection,option)

export default app