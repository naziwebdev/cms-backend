const { isValidObjectId } = require('mongoose')
const orderModel = require('../../models/order')
const orderValidator = require('../../validators/v1/order')

exports.create = async (req, res) => {
    try {

        const { product, price, user } = req.body
        const resultValidate = orderValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const order = await orderModel.create({ product, price, status:'processing', user })

        if (!order) {
            return res.status(404).json({ messsage: 'order not found' })
        }

        const populateProduct = await orderModel.findOne({ _id: order._id })
            .populate('product','title')
            .populate('user', '-password')
            .lean()

        return res.status(201).json({ message: 'order was successfully', populateProduct })

    } catch (error) {
        return res.json(error)
    }
}


exports.getAll = async (req, res) => {
    try {

        const orders = await orderModel.find({})
            .populate('product')
            .populate('user', '-password')
            .lean()

        if (!orders) {
            return res.status(404).json({ messsage: 'order not found' })
        }

        return res.status(200).json(orders)

    } catch (error) {
        return res.json(error)
    }
}

exports.editOrder = async (req, res) => {
    try {

        const { id } = req.params
        const { product, price, status, user } = req.body

        const resultValidate = orderValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const updatedOrder = await orderModel.findOneAndUpdate({ _id: id },
            { product, price, status, user })

        if (!updatedOrder) {
            return res.status(404).json({ message: 'not found order' })
        }

        return res.status(200).json({ message: 'order updated successfully' })

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

        const removedOrder = await orderModel.findOneAndDelete({ _id: id })

        if (!removedOrder) {
            return res.status(404).json({ message: 'not found order' })
        }

        return res.status(200).json({ message: 'order removed successfully' })

    } catch (error) {
        return res.json(error)
    }
}