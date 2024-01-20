const { isValidObjectId } = require('mongoose')
const noteModel = require('../../models/note')
const noteValidator = require('../../validators/v1/note')


exports.create = async (req, res) => {
    try {

        const { body } = req.body

        const resultValidate = noteValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const note = await noteModel.create({
            body,
            user: req.user._id,
        })

        if (!note) {
            return res.status(404).json({ message: 'there is no note' })
        }

        return res.status(200).json({ message: 'note created successfully', note })

    } catch (error) {
        return res.json(error)
    }
}


exports.getAll = async (req, res) => {
    try {

        const notes = await noteModel.find({})
        .sort({_id:-1})
        .lean()

        if (!notes) {
            return res.status(404).json({ message: 'there is no note' })
        }

        return res.status(200).json(notes)

    } catch (error) {
        return res.json(error)
    }
}


exports.editNote = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }
        const { body } = req.body

        const resultValidate = noteValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const updatedNote = await noteModel.findOneAndUpdate({ _id: id }, {
            body
        })

        if (!updatedNote) {
            return res.status(404).json({ message: 'there is no note' })
        }

        return res.status(200).json({ message: 'note updated successfully' })

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


        const removedNote = await noteModel.findOneAndDelete({ _id: id })


        if (!removedNote) {
            return res.status(404).json({ message: 'there is no note' })
        }

        return res.status(200).json({ message: 'note removed successfully' })

    } catch (error) {
        return res.json(error)
    }
}