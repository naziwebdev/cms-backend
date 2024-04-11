const express = require("express");
const multer = require("multer");

const productController = require("../../controllers/v1/product");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const multerStorageProduct = require("../../utils/multerStorageProduct");

const router = express.Router();

router
  .route("/")
  .post(
    multer({
      storage: multerStorageProduct,
      limits: { fileSize: 10000000000 },
    }).single("cover"),
    productController.create
  )
  .get(productController.getAll);

router
  .route("/reportCategory")
  .get(authMiddleware, isAdminMiddleware, productController.reportCategory);

router
  .route("/report")
  .get(authMiddleware, isAdminMiddleware, productController.report);

router
  .route("/:id")
  .put(
    multer({
      storage: multerStorageProduct,
      limits: { fileSize: 1000000000 },
    }).single("cover"),
    productController.editProduct
  )
  .delete(productController.removeProduct);

module.exports = router;
