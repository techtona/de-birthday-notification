import dotenv from "dotenv";
import express from "express";
import logger from "./helpers/logger";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use("/", routes);

export default app;
