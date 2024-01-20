const express = require('express')
const path = require('path')
const cors = require('cors')
const authRouter = require('./routes/v1/auth')
const usersRouter = require('./routes/v1/user')
const categoryRouter = require('./routes/v1/category')
const productRouter = require('./routes/v1/product')
const orderRouter = require('./routes/v1/order')
const commentRouter = require('./routes/v1/comment')
const ticketRouter = require('./routes/v1/ticket')
const todoRouter = require('./routes/v1/todo')
const noteRouter = require('./routes/v1/note')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/products/covers', express.static(path.join(__dirname, 'public', 'prducts', 'covers')))


app.use('/v1/auth', authRouter)
app.use('/v1/users', usersRouter)
app.use('/v1/category', categoryRouter)
app.use('/v1/products', productRouter)
app.use('/v1/orders', orderRouter)
app.use('/v1/comments', commentRouter)
app.use('/v1/tickets', ticketRouter)
app.use('/v1/todos', todoRouter)
app.use('/v1/notes', noteRouter)

module.exports = app