const { isValidObjectId } = require('mongoose')
const eventModel = require('../../models/event')
const eventValidator = require('../../validators/v1/event')


exports.create = async (req, res) => {
    try {

        const { title , description , date , time } = req.body

        const resultValidate = eventValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const event = await eventModel.create({
          title,description,date,time
        })

        if (!event) {
            return res.status(404).json({ message: 'there is no event' })
        }

        return res.status(201).json({ message: 'event created successfully', event })

    } catch (error) {
        return res.json(error)
    }
}


exports.getAll = async (req, res) => {
    try {

        const events = await eventModel.find({})
        .sort({_id:-1})
        .lean()

        if (!events) {
            return res.status(404).json({ message: 'there is no event' })
        }

        return res.status(200).json(events)

    } catch (error) {
        return res.json(error)
    }
}


exports.editEvent = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }
        const { title , description , date , time } = req.body

        const resultValidate = eventValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const updatedEvent = await eventModel.findOneAndUpdate({ _id: id }, {
            title,description,date,time
        })

        if (!updatedEvent) {
            return res.status(404).json({ message: 'there is no event' })
        }

        return res.status(200).json({ message: 'event updated successfully' })

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


        const removedEvent = await eventModel.findOneAndDelete({ _id: id })


        if (!removedEvent) {
            return res.status(404).json({ message: 'there is no event' })
        }

        return res.status(200).json({ message: 'event removed successfully' })

    } catch (error) {
        return res.json(error)
    }
}