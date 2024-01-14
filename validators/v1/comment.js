const validator = require('fastest-validator')

const v = new validator()

const schema = {
    user: { type: 'string', pattern: /^[0-9a-fA-F]{24}$/ },
    title: { type: 'string', min: 3, max: 100 },
    body: { type: 'string', min: 3, max: 300 },
    score: { type: 'number', min: 0, max: 5 },
    product: { type: 'string', pattern: /^[0-9a-fA-F]{24}$/ },
    isAccept: { type: 'number', min: 0, max: 1 },
    isAnswer: { type: 'number', min: 0, max: 1 },
    mainCommentID: { type: 'string', pattern: /^[0-9a-fA-F]{24}$/, optional: true },
    $$strict: true

}

const check = v.compile(schema)

module.exports = check