const { isValidObjectId } = require('mongoose')
const commentModel = require('../../models/comments')
const cmValidator = require('../../validators/v1/comment')
const productModel = require('../../models/product')

exports.create = async (req, res) => {

    try {

        const { title, body, score, productHref } = req.body

        const resultValidate = cmValidator(req.body)

        if (resultValidate !== true) {
            return res.status(422).json(resultValidate)
        }

        const mainproduct = await productModel.findOne({ href: productHref })
            .lean()

        if (!mainproduct) {
            return res.status(404).json({ message: 'productHref there is no' })
        }

        const comment = await commentModel.create({
            user: req.user._id,
            title, body, score,
            product: mainproduct._id,
            isAnswer: 0,
            isAccept: 0
        })

        if (!comment) {
            return res.status(404).json({ message: 'comment not found' })
        }

        const populatedComment = await commentModel.findOne({ _id: comment._id })
            .populate('user', 'name')
            .populate('product', 'title')
            .lean()

        return res.status(201).json({ message: 'comment create successfully',comment:populatedComment })

    } catch (error) {
        return res.json(error)
    }

}
exports.getAll = async (req, res) => {

    try {

        const comments = await commentModel.find({})
            .populate('user', 'name avatar')
            .populate('product', 'title')
            .lean()

        if (!comments) {
            return res.status(404).json({ message: 'comment no found' })
        }

        let allComments = []

        comments.forEach(comment => {
            let mainCommentAnswerInfo = null;
            comments.forEach(answerComment => {
                if (String(comment._id) === String(answerComment.mainCommentID)) {
                    mainCommentAnswerInfo = { ...answerComment };
                }
            })
            if (!comment.mainCommentID) {
                allComments.push({
                  ...comment,
                  answerContent: mainCommentAnswerInfo,
                });
              }
        })

       

        return res.status(200).json(allComments)

    } catch (error) {
        return res.json(error)
    }

}
exports.report = async (req, res) => {

    try {

        const comments = await  commentModel.aggregate([
            {
              $group: {
                _id: "$score", // Group by the "score" field
                count: { $sum: 1 }, // Calculate the count for each group
              },
            },
            {
              $sort: {
                _id: -1, // Sort by the "_id" field (which is the "score" field) in ascending order
              },
            },
          ]);

        return res.status(200).json(comments)

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

        const removedCm = await commentModel.findOneAndDelete({ _id: id })

        if (!removedCm) {
            return res.status(404).json({ message: 'comment not found' })
        }

        return res.status(200).json({ message: 'comment removed successfully' })


    } catch (error) {
        return res.json(error)

    }
}

exports.accept = async (req, res) => {

    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const acceptComment = await commentModel.findOneAndUpdate({ _id: id },
            { isAccept: 1 })

        if (!acceptComment) {
            return res.status(404).json({ message: 'comment not found' })
        }

        return res.status(200).json({ message: 'comment accept successfully' })


    } catch (error) {
        return res.json(error)
    }

}
exports.reject = async (req, res) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const rejectComment = await commentModel.findOneAndUpdate({ _id: id },
            { isAccept: 0 })

        if (!rejectComment) {
            return res.status(404).json({ message: 'comment not found' })
        }

        return res.status(200).json({ message: 'comment reject successfully' })


    } catch (error) {
        return res.json(error)
    }
}
exports.answer = async (req, res) => {

    try {
        const { id } = req.params
        const { title, body } = req.body


        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'id is not valid' })
        }

        const acceptComment = await commentModel.findOneAndUpdate({ _id: id }, {
            isAccept: 1
        })


        const answerComment = await commentModel.create({
            user: req.user._id,
            title, body,
            product: acceptComment.product,
            isAnswer: 1,
            mainCommentID: id,
            isAccept: 1
        })

        if (!answerComment) {
            return res.status(404).json({ message: 'comment not found' })
        }

        return res.status(201).json({ message: 'comment create successfully' })

    } catch (error) {
        return res.json(error)
    }
}
