const fs = require('fs')
const path = require('path')

const { isValidObjectId } = require('mongoose')
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


exports.getAll = async (req, res) => {
    try {

        const products = await productModel.find({}).populate('categoryId')
            .lean()
            .sort({ _id: -1 })

        if (!products) {
            return res.status(404).json({ message: 'there is no product' })
        }

        return res.status(200).json(products)

    } catch (error) {
        return res.json(error)
    }
}


exports.report = async (req, res) => {
    try {
        const products = await productModel.aggregate([
          {
            $group: {
              _id: { $month: '$createdAt' }, // Group by the month (number)
              numberofdocuments: { $sum: 1 }, // Count the documents
            },
          },
          {
            $project: {
              _id: false, // Remove the default '_id' field
              month: {
                $arrayElemAt: [
                  [
                    '', // Month numbers start at 1, so the 0th element can be anything
                    'january', 'february', 'march', 'april', 'may', 'june',
                    'july', 'august', 'september', 'october', 'november', 'december'
                  ],
                  '$_id'
                ],
              },
              numberofdocuments: true, 
            },
          },
        ]);
      
        return res.status(200).json(products)
    } catch (err) {
        return res.json(err)
    }
}


exports.reportCategory = async (req, res) => {
    try {

        const category = await productModel.aggregate([
            {
              $group: {
                _id: "$categoryId", // Group by the 'category' field
                count: { $sum: 1 }, // Calculate the count for each group
              },
            },
            {
                $lookup: {
                  from: "categories", // The collection to join with
                  localField: "_id", // Field from the input documents
                  foreignField: "_id", // Field from the documents of the "from" collection
                  as: "categoryDetails" // Output array field
                }
              }
          ]);
        return res.status(200).json(category)
    } catch (err) {
        return res.json(err)
    }
}


exports.editProduct = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const { title, price, href, discount, categoryId } = req.body
        const cover = req.file.filename


        const resultValidator = productValidator({ ...req.body, cover })

        if (resultValidator !== true) {
            return res.status(422).json(resultValidator)
        }

        const updatedProduct = await productModel.findOneAndUpdate({ _id: id },
            { title, price, href, discount, cover, categoryId })

        if (!updatedProduct) {
            return res.status(404).json({ message: 'not found product' })
        }

        return res.status(200).json({
            message: 'product updated successfully', product:
                updatedProduct
        })

    } catch (error) {
        return res.json(error)
    }
}


exports.removeProduct = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const removedProduct = await productModel.findOneAndDelete({ _id: id })

        const coverUrl = path.join(__dirname, '..', '..', 'public', 'products'
            , 'covers', removedProduct.cover)


        fs.unlinkSync(coverUrl)

        if (!removedProduct) {
            return res.status(404).json({ message: 'not found product' })
        }

        //delete comments of product

        return res.status(200).json({ message: 'product removed successfully' })

    } catch (error) {
        return res.json(error)
    }
}