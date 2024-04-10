const express = require('express')
const orderController = require('../../controllers/v1/order')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()

router.route('/')
    .post(authMiddleware, orderController.create)
    .get(authMiddleware, isAdminMiddleware, orderController.getAll)
    router
    .route("/report")
    .get(authMiddleware, isAdminMiddleware, orderController.report);

router.route('/:id')
    .put(authMiddleware, isAdminMiddleware, orderController.editOrder)
    .delete(authMiddleware, isAdminMiddleware, orderController.remove)


module.exports = router