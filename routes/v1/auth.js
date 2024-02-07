const express = require("express");
const controller = require("../../controllers/v1/auth");
const authMiddleware = require("../../middlewares/auth");
const multer = require('multer')
const multerStorageUser = require("../../utils/multerStorageUser");

const router = express.Router();

router.route("/register").post(
  multer({
    storage: multerStorageUser,
    limits: { fileSize: 1000000000 },
  }).single("avatar"),
  controller.register
);

router.route("/login").post(controller.login);

router.route("/me").get(authMiddleware, controller.getMe);

module.exports = router;
