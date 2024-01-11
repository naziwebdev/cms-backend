const { isValidObjectId } = require('mongoose')
const banUserModel = require('../../models/banUser')
const userModel = require('../../models/user')

exports.getAll = async (req, res) => {

    try {
        const users = await userModel.find({}, '-password').lean()

        if (!users) {
            return res.status(404).json({ message: 'not found users' })
        }

        return res.status(200).json(users)
    } catch (err) {
        return res.json(err)
    }
}


exports.deleteUser = async (req, res) => {

    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {

            return res.status(422).json({ message: 'id is not valid' })
        }

        const removedUser = await userModel.findOneAndDelete({ _id: id })

        if (!removedUser) {
            return res.status(404).json({ message: 'there is no user' })
        }

        return res.status(200).json({ message: 'user removed successfully'})

    } catch (err) {
        return res.json(err)
    }
}


exports.banUser = async (req, res) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(422).json({ message: 'id is not valid' })
        }

        const user = await userModel.findOne({ _id: id }).lean()

        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }

        const userBan = await banUserModel.create({ phone: user.phone })

        if (!userBan) {
            return res.status(500).json({ message: 'server error' })
        }

        return res.status(201).json({ message: 'user banned successfully' })

    } catch (err) {
        return res.json(err)
    }

}