const { isValidObjectId } = require('mongoose')
const categoryModel = require('../../models/category')
const categoryValidator = require('../../validators/v1/category')

exports.create = async (req, res) => {

    try {
        const { title, href } = req.body

        const resultValidate = categoryValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json({ message: 'body is not valid' })
        }

        const category = await categoryModel.create({ title, href })

        if (!category) {
            return res.status(404).json({ message: 'not found category' })
        }

        return res.status(201).json({ message: 'category created successfully', category })

    } catch (err) {
        return res.json(err)
    }
}


exports.getAll = async (req, res) => {
    try {

        categories = await categoryModel.find({}).lean()

        if (!categories) {
            {
                return res.status(404).json({ message: 'there is no category' })
            }
        }
        return res.status(200).json(categories)

    } catch (error) {

        return res.json(error)
    }
}


exports.editCategory = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const { title, href } = req.body

        const resultValidate = categoryValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json({ message: 'body is not valid' })
        }

        const updatedCategory = await categoryModel.findOneAndUpdate({ _id: id },
            { title, href })

        if (!updatedCategory) {
            return res.status(404).json({ message: 'not found category' })
        }

        return res.status(200).json({ message: 'category updated successfully', updatedCategory })


    } catch (error) {

        return res.json(err)

    }
}


exports.deleteCategory = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const removedCategory = await categoryModel.findOneAndDelete({ _id: id })

        if (!removedCategory) {
            return res.status(404).json({ message: 'there is not category' })
        }

        return res.status(200).json({ message: 'category removed successfully', removedCategory })

    } catch (error) {

        return res.json(error)

    }
}