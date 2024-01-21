const express = require('express')
const offController = require('../../controllers/v1/off')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()


router.route('/')
    .post(authMiddleware, isAdminMiddleware, offController.create)
    .get(authMiddleware, isAdminMiddleware, offController.getAll)


router.route('/:code')
    .get(authMiddleware, offController.getOne)

router.route('/all')
    .put(authMiddleware, isAdminMiddleware, offController.setOnAll)

router.route('/:id')
    .put(authMiddleware, isAdminMiddleware, offController.editOff)
    .delete(authMiddleware, isAdminMiddleware, offController.remove)
module.exports = router