const { isValidObjectId } = require('mongoose')
const ticketModel = require('../../models/ticket')
const ticketValidator = require('../../validators/v1/ticket')

exports.create = async (req, res) => {
    try {

        const { title, body, product } = req.body

        const resultValidate = ticketValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const ticket = await ticketModel.create({
            title, body,
            user: req.user._id,
            product, answer: 0,
            isAnswer: 0,
        })

        if (!ticket) {
            return res.status(404).json({ message: 'there is no ticket' })
        }

        const mainTicket = await ticketModel.findOne({ _id: ticket._id })
            .populate('user', '-password')
            .lean()

        return res.status(201).json({ message: 'ticket create successfully', mainTicket })

    } catch (error) {
        return res.json(error)
    }
}


exports.getAll = async (req, res) => {
    try {

        const tickets = await ticketModel.find({ isAnswer: 0 })
            .populate('user', '-password')
            .lean()

        if (!tickets) {
            return res.status(404).json({ message: 'there is no ticket' })
        }

        return res.status(200).json(tickets)

    } catch (error) {
        return res.json(error)
    }
}


exports.setAnswer = async (req, res) => {
    try {

        const { title, body, ticketID } = req.body

        const mainTicket = await ticketModel.findOne({ _id: ticketID })
            .lean()

        const ticket = await ticketModel.create({
            title,
            body,
            user: req.user._id,
            product: mainTicket.product,
            answer: 0,
            isAnswer: 1,
            parent: ticketID
        })

        if (!ticket) {
            return res.status(404).json({ message: 'there is no ticket' })
        }

        const updateTicket = await ticketModel.findOneAndUpdate({ _id: ticketID },
            { answer: 1 })

        return res.status(201).json({ message: 'ticket create successfully', ticket })

    } catch (error) {
        return res.json(error)
    }
}


exports.getAnswer = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const ticket = await ticketModel.findOne({ _id: id })
            .populate('user', 'name')
            .lean()

        const answerTicket = await ticketModel.findOne({ parent: id })
            .populate('user', 'name')
            .lean()


        if (!ticket || !answerTicket) {
            return res.status(404).json({ message: 'there is no answer for this ticket' })
        }

        return res.status(200).json({ ticket, answerTicket })

    } catch (error) {
        return res.json(error)
    }
}


exports.getUserTickets = async (req, res) => {
    try {

        const tickets = await ticketModel.find({ user: req.user._id })
            .sort({ _id: -1 })
            .populate('user', '-password')
            .lean()


        if (!tickets) {
            return res.status(404).json({ message: 'there is no ticket' })
        }

        return res.status(200).json(tickets)

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


        const removeTicket = await ticketModel.findOneAndDelete({ _id: id })
        const removeAnswerTicket = await ticketModel.findOneAndDelete({ parent: id })

        if (!removeTicket) {
            return res.status(404).json({ message: 'there is no ticket' })
        }

        return res.status(200).json({ message: 'ticket removed successfully' })

    } catch (error) {
        return res.json(error)
    }
}