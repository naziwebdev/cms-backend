const { isValidObjectId } = require('mongoose')
const offmodel = require('../../models/off')
const productModel = require('../../models/product')
const offValidator = require('../../validators/v1/off')


exports.create = async (req, res) => {
    try {

        const { code, percent, product, expireDay, maxUsage, user } = req.body

        const resultValidate = offValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const off = await offmodel.create({
            code, percent, product,
            expireDay, maxUsage,
            countUsaged: 0,
            user
        })

        if (!off) {
            return res.status(404).json({ message: 'there is no off' })
        }

        return res.status(201).json({ message: 'off create successfully', off })

    } catch (error) {
        return res.json(error)
    }
}

exports.getAll = async (req, res) => {
    try {

        const offs = await offmodel.find({})
            .sort({ _id: -1 })
            .lean()

        if (!offs) {
            return res.status(404).json({ message: 'there is no off' })
        }

        return res.status(200).json(offs)

    } catch (error) {
        return res.json(error)
    }
}


exports.getOne = async (req, res) => {
    try {

        const { code } = req.params

        if (code.length < 3) {
            return res.status(422).json({ message: 'code is not valid' })
        }

        const mainCode = await offmodel.findOne({ code })
            .lean()

        if (!mainCode) {
            return res.status(404).json({ message: 'there is no code' })

        } else if (mainCode.maxUsage === mainCode.countUsaged) {

            return res.status(409).json({ message: 'this code used before' })

        } else if (false) {
            //code expireDate
        } else {
            const updateUsageOff = await offmodel.findOneAndUpdate({ code }, {
                countUsaged: mainCode.countUsaged + 1
            })
        }

        return res.status(200).json(mainCode)

    } catch (error) {
        return res.json(error)
    }
}
exports.setOnAll = async (req, res) => {
    try {

        const { percent } = req.body

        const allOff = await productModel.updateMany({ discount: percent })

        if (!allOff) {
            return res.status(404).json({ message: 'there is no off' })
        }

        return res.status(200).json({ message: 'off set all product successfully' })

    } catch (error) {
        return res.json(error)
    }
}


exports.editOff = async (req, res) => {
    try {

        const { code, percent, product, expireDay, maxUsage, user } = req.body

        const resultValidate = offValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const updatedOff = await offmodel.findOneAndUpdate({ _id: id },
            { code, percent, product, expireDay, maxUsage, user })


        if (!updatedOff) {
            return res.status(404).json({ message: 'there is no off' })
        }

        return res.status(200).json({ message: 'off updated successfully' })


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


        const removedOff = await offmodel.findOneAndDelete({ _id: id })


        if (!removedOff) {
            return res.status(404).json({ message: 'there is no off' })
        }

        return res.status(200).json({ message: 'off removed successfully' })

    } catch (error) {
        return res.json(error)
    }
}