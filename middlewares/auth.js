const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {

    const getToken = req.header('Authorization')?.split(' ')

    if (getToken.length !== 2) {
        return res.status(403).json({ message: 'access to this route is forbidden' })
    }

    const token = getToken[1]

    try {

        const payloadToken = jwt.verify(token, process.env.SECRET_KEY)

        const user = await userModel.findOne({ _id: payloadToken.id }, '-password').lean()
       
        req.user = user

        next()

    } catch (err) {

        return res.json(err)
    }

}