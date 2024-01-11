const express = require('express')
const multer = require('multer')

const productController = require('../../controllers/v1/product')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')
const multerStorage = require('../../utils/multerStorage')


const router = express.Router()

router.route('/')
    .post(
        multer({ storage: multerStorage, limits: { fileSize: 1000000000 } })
            .single('cover'),
        authMiddleware, isAdminMiddleware, productController.create
    )



module.exports = router