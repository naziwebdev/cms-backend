const validator = require('fastest-validator')

const v = new validator()

const schema = {
    title:{type:'string',min:3,max:100},
    isComplete:{type:'boolean'},
    user:{type:'string',pattern:/^[0-9a-fA-F]{24}$/},
    date:{type:'date'},
    $$strict:true
}

const check = v.compile(schema)

module.exports = check