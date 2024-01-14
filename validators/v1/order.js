const validator = require('fastest-validator')

const v = new validator()

const schema = {

    product: {
        type: 'string',
        pattern:/^[0-9a-fA-F]{24}$/
    },
    price: {
        type: 'number',
        min: 0,
    },
    user: {
        type: 'string',
        pattern:/^[0-9a-fA-F]{24}$/
    },
    $$struct:true

}

const check = v.compile(schema)

module.exports = check