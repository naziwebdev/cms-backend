const { isValidObjectId } = require('mongoose')
const costModel = require('../../models/cost')
const costValidator = require('../../validators/v1/cost')



exports.create = async (req, res) => {
  
    try {
        const { title, status, date, price } = req.body

        const resultValidate = costValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const cost = await costModel.create({
            title, status, date, price
        })

        if (!cost) {
            return res.status(404).json({ message: 'there is no cost' })
        }

        return res.status(201).json({ message: 'cost created successfully', cost })

    } catch (error) {
        return res.json(error)
    }
}


exports.getAll = async (req, res) => {
    try {

        const costs = await costModel.find({})
            .sort({ _id: -1 })
            .lean()

        if (!costs) {
            return res.status(404).json({ message: 'there is no cost' })
        }

        return res.status(200).json(costs)

    } catch (error) {
        return res.json(error)
    }
}

exports.report = async (req, res) => {
    try {
        const costs = await costModel.aggregate([
          {
            $group: {
              _id: { $month: '$createdAt' }, // Group by month (extracted from createdAt)
              totalAmount: { $sum: '$price' }, // Sum the 'amount' field
            },
          },
          {
            $project: {
              _id: false, // Exclude the default '_id' field
              month: {
                $arrayElemAt: [
                  [
                    '', 'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                  ],
                  '$_id'
                ],
              },
              totalAmount: true, // Keep the total amount
            },
          },
        ]);
      
        return res.status(200).json(costs)
    } catch (err) {
        return res.json(err)
    }
}



exports.getLowPrice = async (req, res) => {
    try {

        const costs = await costModel.find({})
            .sort({ price: 1 })
            .lean()

        if (!costs) {
            return res.status(404).json({ message: 'there is no cost' })
        }

        return res.status(200).json(costs)

    } catch (error) {
        return res.json(error)
    }
}


exports.getHighPrice = async (req, res) => {
    try {


        const costs = await costModel.find({})
            .sort({ price: -1 })
            .lean()

        if (!costs) {
            return res.status(404).json({ message: 'there is no cost' })
        }

        return res.status(200).json(costs)

    } catch (error) {
        return res.json(error)
    }
}


exports.editCost = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }
        const { title, status, date, price } = req.body

        const resultValidate = costValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const updatedCost = await costModel.findOneAndUpdate({ _id: id }, {
            title, status, date, price
        })

        if (!updatedCost) {
            return res.status(404).json({ message: 'there is no cost' })
        }

        return res.status(200).json({ message: 'cost updated successfully' })

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


        const removedCost = await costModel.findOneAndDelete({ _id: id })


        if (!removedCost) {
            return res.status(404).json({ message: 'there is no cost' })
        }

        return res.status(200).json({ message: 'cost removed successfully' })

    } catch (error) {
        return res.json(error)
    }
}