const express = require("express");
const costController = require("../../controllers/v1/cost");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, costController.create)
  .get(authMiddleware, isAdminMiddleware, costController.getAll);
router
  .route("/report")
  .get(authMiddleware, isAdminMiddleware, costController.report);

router
  .route("/low-price")
  .get(authMiddleware, isAdminMiddleware, costController.getLowPrice);

router
  .route("/high-price")
  .get(authMiddleware, isAdminMiddleware, costController.getHighPrice);

router
  .route("/:id")
  .put(authMiddleware, isAdminMiddleware, costController.editCost)
  .delete(authMiddleware, isAdminMiddleware, costController.remove);

module.exports = router;
