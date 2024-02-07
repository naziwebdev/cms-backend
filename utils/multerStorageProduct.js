const multer = require('multer')
const path = require('path')

module.exports = multer.diskStorage({

    destination: (req, file, cb) => {
        
        cb(null, path.join(__dirname, '..', 'public', 'products', 'covers'))
    },

    filename: (req, file, cb) => {

        const validFormats = ['.jpeg','.jpg','.png']

        const filename = Date.now() + String(Math.random() * 9999)
        const fileExt = path.extname(file.originalname)

        if(validFormats.includes(fileExt)){
            cb(null, filename + fileExt)
        }else{

            cb(new Error ('format is not valid'))
        }
 
    }
})

