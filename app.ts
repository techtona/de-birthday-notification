import dotenv from "dotenv";
import logger from "./src/configs/logger";
import express from "express";
import routes from "./src/frameworks/http/routes";
import mongoose from "mongoose"
import connection from "./src/frameworks/database/mongodb/connection"

dotenv.config();
const port = process.env.APP_PORT || 8000;
const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/birthday_notification"

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

//definer the routes
app.use("/", routes);

// mongodb connect
connection(mongoose,mongoUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).connectToMongo()

// web server listen
app.listen(port, () => {
    logger.info( `server is listening on ${port}`);
});

export default app