const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../../models/user')
const registerValidator = require('../../validators/v1/register')
const loginValidator = require('../../validators/v1/login')
require('dotenv').config()

exports.register = async (req, res) => {

    try {

        const { name, username, email, phone, password,
            age, gender } = req.body

        const resultValidate = registerValidator(req.body)

        //if put !resultValidator its dont work
        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const isExistUser = await userModel.findOne(
            { $or: [{ email }, { phone }, { username }] }
        )

        if (isExistUser) {
            return res.status(409).json({ message: 'user exist already' })
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const countUser = await userModel.countDocuments()

        const user = await userModel.create({
            name, username, email, phone,
            password: hashPassword,
            age, gender,
            role: countUser > 0 ? 'USER' : 'ADMIN'
        })

        const mainUser = user.toObject()
        Reflect.deleteProperty(mainUser, 'password')

        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '30 day'
        })

        if (!mainUser) {
            return res.status(401).json({ message: 'user register was faild' })
        }

        return res.status(201).json({ user: mainUser, token: accessToken })


    } catch (err) {

        return res.status(500).json({ message: 'unknown server error' }, err)
    }

}


exports.login = async (req, res) => {
    try {

        const { identifier, password } = req.body

        const resultValidate = loginValidator(req.body)

        if(resultValidate !==true){
            return res.status(422).json(resultValidate)
        }

        const validateIdentifier = await userModel.findOne({
            $or: [{ email: identifier }, { phone: identifier }]
        })

        if (!validateIdentifier) {
            return res.status(401).json({ message: 'email | phone or password is not valid' })
        }

        const validatePassword = await bcrypt.compare(password, validateIdentifier.password)

        if (!validatePassword) {
            return res.status(401).json({ message: 'email | phone or password is not valid' })
        }

        const accessToken = jwt.sign({ id: validateIdentifier._id }, process.env.SECRET_KEY, {
            expiresIn: '30 day'
        })

        const user = validateIdentifier.toObject()
        Reflect.deleteProperty(validateIdentifier, 'password')

        return res.status(200).json({ message: 'user login successfully', accessToken })

    } catch (err) {
        return res.status(500).json({ message: 'unknown server error' })
    }
}



exports.getMe = async (req, res) => {

    


}