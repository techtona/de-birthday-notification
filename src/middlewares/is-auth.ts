import jwt from "jsonwebtoken";
import logger from "../helpers/logger";
import redis from "../helpers/redis";
import isbot from 'isbot';

export default async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }
    req.token = token;
    let redisToken;
    try {
        redisToken = await redis.get(token);
    } catch (error) {
        req.isAuth = false;
        return next();
    }
    if (!redisToken) {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.APP_KEY);
        if (process.env.APP_DEBUG == "false" && isbot(req.get('user-agent'))) {
            const message = { userId: decodedToken.userId, "isbot": true }
            logger.warn(message)
            await redis.del(token)
            req.isAuth = false;
        }
    } catch (e) {
        logger.error(e)
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
};
