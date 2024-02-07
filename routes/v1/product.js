const express = require('express')
const multer = require('multer')

const productController = require('../../controllers/v1/product')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')
const multerStorageProduct = require('../../utils/multerStorageProduct')


const router = express.Router()

router.route('/')
    .post(
        multer({ storage: multerStorageProduct, limits: { fileSize: 1000000000 } })
            .single('cover'),
        authMiddleware, isAdminMiddleware, productController.create
    )
    .get(productController.getAll)


router.route('/:id')
    .put(
        multer({ storage: multerStorageProduct, limits: { fileSize: 1000000000 } })
            .single('cover'),
        authMiddleware, isAdminMiddleware, productController.editProduct
    )
    .delete(authMiddleware, isAdminMiddleware, productController.removeProduct)

module.exports = router