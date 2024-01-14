const express = require('express')
const authMiddleWare = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')
const cmController = require('../../controllers/v1/comment')

const router = express.Router()

router.route('/')
    .post(authMiddleWare, cmController.create)
    .get(authMiddleWare, isAdminMiddleware, cmController.getAll)


router.route('/:id')
    .delete(authMiddleWare, isAdminMiddleware, cmController.remove)

router.route('/:id/accept')
    .put(authMiddleWare, isAdminMiddleware, cmController.accept)

router.route('/:id/reject')
    .put(authMiddleWare, isAdminMiddleware, cmController.reject)

router.route('/:id/answer')
    .post(authMiddleWare, isAdminMiddleware, cmController.answer)


module.exports = router