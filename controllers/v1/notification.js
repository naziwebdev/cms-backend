const { isValidObjectId } = require('mongoose')
const notifModel = require('../../models/notification')
const notifValidator = require('../../validators/v1/notification')


exports.create = async (req, res) => {
    try {

        const { message, admin } = req.body

        const resultValidate = notifValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const notif = await notifModel.create({
            message,
            admin,
            seen: 0
        })

        if (!notif) {
            return res.status(404).json({ message: 'there is no notif' })
        }

        return res.status(200).json({ message: 'notif created successfully', notif })

    } catch (error) {
        return res.json(error)
    }
}


exports.getAll = async (req, res) => {
    try {

        const notifs = await notifModel.find({})
            .populate('admin', 'name')
            .sort({ _id: -1 })
            .lean()

        if (!notifs) {
            return res.status(404).json({ message: 'there is no notif' })
        }

        return res.status(200).json(notifs)

    } catch (error) {
        return res.json(error)
    }
}


exports.userNotif = async (req, res) => {
    try {

        const notifs = await notifModel.find({ admin: req.user._id })
            .populate('admin', 'name')
            .sort({_id:-1})
            .lean()

        if (!notifs) {
            return res.status(404).json({ message: 'there is no notif' })
        }

        return res.status(200).json(notifs)


    } catch (error) {
        return res.json(error)
    }
}

exports.seenNotif = async (req, res) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const updatedNotif = await notifModel.findOneAndUpdate({ _id: id }, {
            seen:1
        })

        if (!updatedNotif) {
            return res.status(404).json({ message: 'there is no notif' })
        }

        return res.status(200).json({ message: 'notif seen successfully' })

    } catch (error) {
        return res.json(error)
    }
}



exports.editNotif = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }
        const { message , admin } = req.body

        const resultValidate = notifValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const updatedNotif = await notifModel.findOneAndUpdate({ _id: id }, {
            message,admin
        })

        if (!updatedNotif) {
            return res.status(404).json({ message: 'there is no notif' })
        }

        return res.status(200).json({ message: 'notif updated successfully' })

    } catch (error) {
        return res.json(error)
    }
}


exports.remove = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }


        const removedNotif = await notifModel.findOneAndDelete({ _id: id })


        if (!removedNotif) {
            return res.status(404).json({ message: 'there is no notif' })
        }

        return res.status(200).json({ message: 'notif removed successfully' })

    } catch (error) {
        return res.json(error)
    }
}