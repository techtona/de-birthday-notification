import express from "express";
import userController from "./contollers/userController";

const router = express.Router();
// ota check
router.route("/user").get(userController.index);
router.route("/user").post(userController.store);
router.route("/user/:id").delete(userController.destroy);
router.route("/user/:id").put(userController.update);


export default router;
