const express = require('express')
const eventController = require('../../controllers/v1/event')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()


router.route('/')
    .post(authMiddleware, isAdminMiddleware, eventController.create)
    .get(authMiddleware, isAdminMiddleware, eventController.getAll)


router.route('/:id')
    .put(authMiddleware, isAdminMiddleware, eventController.editEvent)
    .delete(authMiddleware, isAdminMiddleware, eventController.remove)

router.route('/today')
.get(authMiddleware,isAdminMiddleware,eventController.getToday)

router.route('/weekly')
.get(authMiddleware,isAdminMiddleware,eventController.getWeekly)

module.exports = router