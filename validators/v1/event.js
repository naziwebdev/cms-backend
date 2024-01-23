const validator = require('fastest-validator')

const v = new validator()

const schema = {
    title: { type: 'string', min: 3, max: 100 },
    description: { type: 'string', optional: true },
    date: { type: 'string' },
    time: { type: 'string' },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check