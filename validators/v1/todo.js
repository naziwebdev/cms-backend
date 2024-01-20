const validator = require('fastest-validator')

const v = new validator()

const schema = {
    title:{type:'string',min:3,max:100},
    date:{type:'string'},
    $$strict:true
}

const check = v.compile(schema)

module.exports = check