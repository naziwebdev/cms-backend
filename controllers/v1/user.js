const { isValidObjectId } = require('mongoose')
const banUserModel = require('../../models/banUser')
const userModel = require('../../models/user')

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