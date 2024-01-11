const express = require('express')
const userController = require('../../controllers/v1/user')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()

router.route('/')
    .get(authMiddleware,isAdminMiddleware,userController.getAll)

router.route('/ban/:id')
    .put(authMiddleware, isAdminMiddleware, userController.banUser)

router.route('/:id')
.delete(authMiddleware,isAdminMiddleware,userController.deleteUser)



module.exports = router