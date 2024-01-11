const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/v1/auth')
const usersRouter = require('./routes/v1/user')
const categoryRouter = require('./routes/v1/category')
const productRouter = require('./routes/v1/product')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



app.use('/v1/auth', authRouter)
app.use('/v1/users', usersRouter)
app.use('/v1/category', categoryRouter)
app.use('/v1/products', productRouter)

module.exports = app