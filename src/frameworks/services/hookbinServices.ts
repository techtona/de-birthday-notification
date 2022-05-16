import https from "https";
import dotenv from "dotenv";
dotenv.config()

const request = (data) => {
    const dataString = JSON.stringify(data)
    const options = {
        hostname: "hookb.in",
        port: 443,
        path: `/${process.env.HOOKBIN_PATH}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": dataString.length
        }
    }
    console.log(options)

    const req = https.request(options, (res) => {
        console.log(`status: ${res.statusCode}`);
    });

    req.write(dataString);
    req.end();
}

export default {request}