const express = require('express')
const todoController = require('../../controllers/v1/todo')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()


router.route('/')
    .post( todoController.create)
    .get(authMiddleware, isAdminMiddleware, todoController.getAll)

router.route('/:id/do')
    .put(authMiddleware, isAdminMiddleware, todoController.changeStatus)

router.route('/:id')
    .put(authMiddleware, isAdminMiddleware, todoController.editTodo)
    .delete(authMiddleware, isAdminMiddleware, todoController.remove)

module.exports = router