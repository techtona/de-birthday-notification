import Ota from "../models/otaPackage";
import DeviceCredential from "../models/deviceCredential";
import Device from "../models/device";
import logger from "../helpers/logger";
import getToken from "../helpers/thingsboard"
import axios from "axios";
import stream from "stream"

const check = async (req, res) => {
    try {
        const dc = await DeviceCredential.findOne({
            where: {credentials_id: req.params.token},
            attributes: ['device_id'],
            order: [["created_time","desc"]]
        })
        if (!dc)
            res.status(404).json({message: "Device not found"})

        const device = await Device.findByPk(dc.device_id);
        if (!device)
            res.status(404).json({message: "Device not found"})

        const ota = await Ota.OtaPackage.findOne({
            where : {device_profile_id : device.device_profile_id},
            order : [["version" , "desc"]]
        });

        if (!ota)
            return res.status(404).json({message: "Ota Package not found"});

        res.json({
            type: ota.title,
            version: ota.version,
            host: process.env.APP_URL,
            port: 80,
            bin: `/download/${req.params.token}/firmware.bin`,
            check_signature: false
        })
    } catch (e) {
        logger.error(e);
    }
};

const download = async (req, res, next) => {
    try{
        const dc = await DeviceCredential.findOne({
            where: {credentials_id: req.params.token},
            attributes: ['device_id'],
            order: [["created_time","desc"]]
        })
        if (!dc)
            res.status(404).json({message: "Device not found"})

        const device = await Device.findByPk(dc.device_id);
        if (!device)
            res.status(404).json({message: "Device not found"})

        const ota = await Ota.OtaPackage.findOne({
            where : {device_profile_id : device.device_profile_id},
            order : [["version" , "desc"]]
        });

        if (!ota)
            return res.status(404).json({message: "Ota Package not found"});

        res.set({
            "Content-Type" : "application/octet-stream",
            "Content-Length" : ota.data_size,
            "Content-Disposition": "attachment; filename="+ota.file_name,
        })

        Ota.exportLoSaintForMaster(ota.data, (err, stream) => {
            if (err) return next(err);
            stream.pipe(res);
        });
    }catch (e){
        logger.error(e)
    }
}

const download2 = async (req, res) => {
    const token = await getToken()
    const config = {
        headers: {
            'X-Authorization' : `Bearer ${token}`,
            'Accept': 'application/json'
        }
    }
    try{

        const result = await axios.get(`${process.env.TB_URL}/api/otaPackage/1343cef0-659b-11ec-a360-3d494c2d9264/download`, config);

        res.set({
            "Content-Type" : 'application/macbinary',
            "Content-Disposition": "attachment; filename=firmware.bin",
        })

        var fileContents = Buffer.from(result.data);

        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        readStream.pipe(res);
    }catch (e){
        logger.error(e)
    }

}

export default {check, download};
