const express = require('express')
const orderController = require('../../controllers/v1/order')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()

router.route('/')
    .post(authMiddleware, orderController.create)
    .get(authMiddleware, isAdminMiddleware, getAllOrders)


router.route('/:id')
    .put(authMiddleware, isAdminMiddleware, editOrder)
    .delete(authMiddleware, isAdminMiddleware, removeOrder)


module.exports = router