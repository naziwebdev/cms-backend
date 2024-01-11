const express = require('express')
const productController = require('../../controllers/v1/product')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')


const router = express.Router()





module.exports = router