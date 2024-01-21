const validator = require('fastest-validator')

const v = new validator()

const schema = {
    message: { type: 'string', min: 3, max: 100 },
    admin: { type: 'string', pattern: /^[0-9a-fA-F]{24}$/ },
    seen: { type: 'number', min: 0, max: 1 },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check