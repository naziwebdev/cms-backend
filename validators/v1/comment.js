const validator = require('fastest-validator')

const v = new validator()

const schema = {
    title: { type: 'string', min: 3, max: 100 },
    body: { type: 'string', min: 3, max: 300 },
    score: { type: 'number', min: 0, max: 5 ,optional:true},
    productHref: { type: 'string', min:3 , max:22},
    $$strict: true

}

const check = v.compile(schema)

module.exports = check