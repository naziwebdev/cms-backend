const express = require('express')
const controller = require('../../controllers/v1/auth')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()


router.route('/register')
    .post(controller.register)

router.route('/login')
    .post(authMiddleware,isAdminMiddleware,controller.login)

router.route('/me')
    .get(controller.getMe)



module.exports = router