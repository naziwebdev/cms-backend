const validator = require('fastest-validator')

const v = new validator()

const schema = {
    body:{type:'string',min:3,max:100},
    $$strict:true
}

const check = v.compile(schema)

module.exports = check