import {createLogger, format, transports} from "winston";

export default createLogger({
    transports : [
        new transports.Console({
            level: "info",
        }),
    ],
});
