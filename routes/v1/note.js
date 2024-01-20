const express = require('express')
const noteController = require('../../controllers/v1/note')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()


router.route('/')
    .post(authMiddleware, isAdminMiddleware, noteController.create)
    .get(authMiddleware, isAdminMiddleware, noteController.getAll)


router.route('/:id')
    .put(authMiddleware, isAdminMiddleware, noteController.editNote)
    .delete(authMiddleware, isAdminMiddleware, noteController.remove)

module.exports = router