const { isValidObjectId } = require('mongoose')
const noteModel = require('../../models/note')
const noteValidator = require('../../validators/v1/note')


exports.create = async (req, res) => {
    try {

        const { subject,body } = req.body

        const resultValidate = noteValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const note = await noteModel.create({
            subject,
            body,
            haveStar:0,
            user: req.user._id,
        })

        if (!note) {
            return res.status(404).json({ message: 'there is no note' })
        }

        return res.status(201).json({ message: 'note created successfully', note })

    } catch (error) {
        return res.json(error)
    }
}


exports.getAll = async (req, res) => {
    try {

        const notes = await noteModel.find({})
        .sort({haveStar:-1})
        .populate('user','name')
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
        const { subject,body } = req.body

        const resultValidate = noteValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const updatedNote = await noteModel.findOneAndUpdate({ _id: id }, {
            subject,
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

exports.starNote = async (req,res) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const toggleStar = await noteModel.findOneAndUpdate({_id:id},
            [
                {
                  $set: {
                    haveStar: {
                      $not: "$haveStar"
                    }
                  }
                }
              ])

            
        if (!toggleStar) {
            return res.status(404).json({ message: 'there is no note' })
        }

        return res.status(200).json({ message: 'note put star successfully' })
        
    } catch (error) {
        return res.json(error)
    }
}