const express = require('express')
const ticketController = require('../../controllers/v1/ticket')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()


router.route('/')
    .post(authMiddleware, ticketController.create)
    .get(isAdminMiddleware, authMiddleware, ticketController.getAll)

router.route('/answer')
    .post(authMiddleware, isAdminMiddleware, ticketController.setAnswer)

router.route('/:id/answer')
    .get(authMiddleware, ticketController.getAnswer)

router.route('/userTicket')
    .get(authMiddleware, ticketController.getUserTickets)

router.route('/:id')
    .delete(authMiddleware, isAdminMiddleware, ticketController.remove)


module.exports = router