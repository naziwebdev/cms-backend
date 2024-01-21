const express = require('express')
const notifController = require('../../controllers/v1/notification')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()


router.route('/')
    .post(authMiddleware, isAdminMiddleware, notifController.create)
    .get(authMiddleware, isAdminMiddleware, notifController.getAll)

router.route('/user')
    .get(authMiddleware, isAdminMiddleware, notifController.userNotif)

router.route('/:id/seen')
    .put(authMiddleware, isAdminMiddleware, notifController.seenNotif)

router.route('/:id')
    .put(authMiddleware, isAdminMiddleware, notifController.editNotif)
    .delete(authMiddleware, isAdminMiddleware, notifController.remove)

module.exports = router