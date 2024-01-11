const productModel = require('../../models/product')
const productValidator = require('../../validators/v1/product')


exports.create = async (req, res) => {

    try {
        const { title, price, href, discount, categoryId } = req.body
        const cover = req.file.filename


        const resultValidator = productValidator({ ...req.body, cover })

        if (resultValidator !== true) {
            return res.status(422).json(resultValidator)
        }

        const isExistProduct = await productModel.findOne({ title, href, categoryId }).lean()

        if (isExistProduct) {
            return res.status(409).json({ message: 'product exsist already' })
        }

        const product = await productModel.create({
            title, price, href, cover, discount, categoryId
        })

        if (!product) {
            return res.status(404).json({ message: 'product not found' })
        }

        const populateProduct = await productModel.findOne({ _id: product._id })
            .populate('categoryId')
            .lean()

        return res.status(201).json({ message: 'product create successfully', populateProduct })


    } catch (err) {
        return res.json(err)
    }
}