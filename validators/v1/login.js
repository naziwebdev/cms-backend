const validator = require('fastest-validator')

const v = new validator()

const schema = {

    identifier: { type: 'string' },
    password: { type: 'string', min: 8, max: 30 }
}


const check = v.compile(schema)

module.exports = check