const validator = require('fastest-validator')

const v = new validator()

const schema = {
    title: { type: 'string', min: 3, max: 30 },
    href: { type: 'string', min: 3, max: 30 },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check