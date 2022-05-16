import notification from "./src/frameworks/jobs/notification";
import logger from "./src/configs/logger";
import app from "./src/app";
import dotenv from "dotenv"

dotenv.config();
const port = process.env.APP_PORT || 8000;

// web server listen

app.listen(port, () => {
    notification.birthdayNotificationScheduler()
    logger.info( `server is listening on ${port}`);
});