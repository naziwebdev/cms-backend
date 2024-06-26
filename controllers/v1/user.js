const bcrypt = require('bcrypt')

const { isValidObjectId } = require('mongoose')
const banUserModel = require('../../models/banUser')
const userModel = require('../../models/user')
const userValidator = require('../../validators/v1/user')

exports.getAll = async (req, res) => {

    try {
        const users = await userModel.find({}, '-password')
        .sort({_id:-1})
        .lean()

        if (!users) {
            return res.status(404).json({ message: 'not found users' })
        }

        return res.status(200).json(users)
    } catch (err) {
        return res.json(err)
    }
}

exports.report = async (req, res) => {
    try {
        const users = await userModel.aggregate([
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
          {
            $sort: { month: -1 } 
          }
        ]);
      
        return res.status(200).json(users)
    } catch (err) {
        return res.json(err)
    }
}

exports.editUser = async (req, res) => {

    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const { name, username, email, phone, password, age, gender } = req.body

        const resultValidate = userValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const updatedUser = await userModel.findOneAndUpdate({ _id: id },
            { name, username, email, phone, password: hashedPassword, age, gender })
            .select('-password').lean()

        if (!updatedUser) {
            return res.status(404).json({ message: 'user not found' })
        }

        return res.status(200).json({ message: 'user updated successfully', user: updatedUser })


    } catch (error) {
        return res.json(error)
    }

}



exports.deleteUser = async (req, res) => {

    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {

            return res.status(400).json({ message: 'id is not valid' })
        }

        const removedUser = await userModel.findOneAndDelete({ _id: id })
            .select('-password').lean()


        if (!removedUser) {
            return res.status(404).json({ message: 'there is no user' })
        }

        return res.status(200).json({
            message: 'user removed successfully',
            user: removedUser
        })

    } catch (err) {
        return res.json(err)
    }
}



exports.banUser = async (req, res) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const user = await userModel.findOne({ _id: id }).lean()

        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }

        const userBan = await banUserModel.create({ phone: user.phone })

        if (!userBan) {
            return res.status(500).json({ message: 'server error' })
        }

        return res.status(201).json({ message: 'user banned successfully' })

    } catch (err) {
        return res.json(err)
    }

}


exports.changeRole = async (req, res) => {
    try {

        const {id} = req.body

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const user = await userModel.findOne({ _id: id })

        const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN'

        const roleUpdated = await userModel.findOneAndUpdate({ _id: id },
            { role: newRole })

        if (!roleUpdated) {
            return res.status(404).json({ message: 'not found user' })
        }

        return res.status(200).json({ message: 'user role updated successfully' })

    } catch (error) {
         return res.json(error)
    }
}