const validator = require('fastest-validator')

const v = new validator()

const schema = {

    code: {
        type: 'string',
        min: 3
    },
    percent: {
        type: 'number',
        min:0
    },
    product: {
        type: 'string',
        pattern: /^[0-9a-fA-F]{24}$/,
        optional: true
    },
    expireDay: {
        type: 'number',
        min:1
    },
    maxUsage: {
        type: 'number',
        min: 1
    },
    user: {
        type: 'string',
        pattern: /^[0-9a-fA-F]{24}$/,
        optional: true
    },
    $$strict: true

}

const check = v.compile(schema)

module.exports = check