const { isValidObjectId } = require('mongoose')
const todoModel = require('../../models/todo')
const todoValidator = require('../../validators/v1/todo')


exports.create = async (req, res) => {
    try {

        const { title, date } = req.body

        const resultValidate = todoValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const todo = await todoModel.create({
            title,
            isComplete: false,
            user: req.user._id,
            date
        })

        if (!todo) {
            return res.status(404).json({ message: 'there is no todo' })
        }

        return res.status(201).json({ message: 'todo created successfully', todo })

    } catch (error) {
        return res.json(error)
    }
}


exports.getAll = async (req, res) => {
    try {

        const todos = await todoModel.find({})
        .sort({haveStar:-1})
        .lean()

        if (!todos) {
            return res.status(404).json({ message: 'there is no todo' })
        }

        return res.status(200).json(todos)

    } catch (error) {
        return res.json(error)
    }
}

exports.changeStatus = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }


        const updateCompleteTodo = await todoModel.findOneAndUpdate({ _id: id },
            [
                {
                  $set: {
                    isComplete: {
                      $not: "$isComplete"
                    }
                  }
                }
              ])

        if (!updateCompleteTodo) {
            return res.status(404).json({ message: 'there is no todo' })
        }

        return res.status(200).json({ message: 'todo compelete updated successfully' })

    } catch (error) {
        return res.json(error)
    }
}

exports.editTodo = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }
        const { title, date } = req.body

        const resultValidate = todoValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const updatedTodo = await todoModel.findOneAndUpdate({ _id: id }, {
            title, date
        })

        if (!updatedTodo) {
            return res.status(404).json({ message: 'there is no todo' })
        }

        return res.status(200).json({ message: 'todo updated successfully' })

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


        const removedTodo = await todoModel.findOneAndDelete({ _id: id })


        if (!removedTodo) {
            return res.status(404).json({ message: 'there is no todo' })
        }

        return res.status(200).json({ message: 'todo removed successfully' })

    } catch (error) {
        return res.json(error)
    }
}

exports.starTodo = async (req,res) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const toggleStar = await todoModel.findOneAndUpdate({_id:id},
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