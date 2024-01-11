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
