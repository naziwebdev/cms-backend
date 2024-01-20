const validator = require('fastest-validator')

const v = new validator()

const schema = {
    title:{type:'string',min:3,max:100},
    body:{type:'string',min:3},
    product:{type:'string',optional:true,pattern:/^[0-9a-fA-F]{24}$/},
    $$strict:true
}

const check = v.compile(schema)

module.exports = check