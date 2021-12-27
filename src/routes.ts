import express from "express";
import otaController from "./contollers/otaController";

const router = express.Router();
// ota check
router.route("/check/:token").get(otaController.check);
router.route("/download/:token/firmware.bin").get(otaController.download);

export default router;
