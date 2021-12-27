import axios from "axios"
import logger from "./logger";
import dotenv from "dotenv";
dotenv.config();

const getToken = async () => {
    try {
        const res = await axios.post(`${process.env.TB_URL}/api/auth/login`, {
            username: process.env.TB_USERNAME,
            password: process.env.TB_PASSWORD
        });

        return res.data.token
    } catch (e) {
        logger.error(e)
    }
}

export default getToken;