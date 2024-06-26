const express = require('express')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')
const categoryController = require('../../controllers/v1/category')

const router = express.Router()

router.route('/')
    .post(authMiddleware, isAdminMiddleware, categoryController.create)
    .get(categoryController.getAll)
    router


router.route('/:id')
    .put(authMiddleware, isAdminMiddleware, categoryController.editCategory)
    .delete(authMiddleware, isAdminMiddleware, categoryController.deleteCategory)

module.exports = router