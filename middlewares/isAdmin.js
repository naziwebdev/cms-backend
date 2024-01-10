

module.exports = async (req, res, next) => {

    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'access to this route is forbidden' })
    }

    return next()
}