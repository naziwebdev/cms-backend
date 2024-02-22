const express = require('express')
const userController = require('../../controllers/v1/user')
const multer = require('multer')
const multerStorageUser = require('../../utils/multerStorageUser')
const authMiddleware = require('../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()

router.route('/')
    .get( userController.getAll)

router.route('/ban/:id')
    .put(userController.banUser)

router.route('/role')
    .put(userController.changeRole)

router.route('/:id')
    .delete( userController.deleteUser)
    .put(  multer({
        storage: multerStorageUser,
        limits: { fileSize: 1000000000 },
      }).single("avatar"),userController.editUser)


module.exports = router