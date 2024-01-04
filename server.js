const mongoose = require('mongoose')
const app = require('./app')
require('dotenv').config();


(async () => {

    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Mongodb Connected successfully')

    } catch (err) {
        console.log(err)
    }

})()



app.listen(process.env.PORT, () => {

    console.log(`Server running on port ${process.env.PORT} `)
})


