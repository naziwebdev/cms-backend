const validator = require('fastest-validator')

const v = new validator()

const schema = {
    title: { type: 'string', min: 3, max: 100 },
    status: { type: 'enum', values: ['پرداخت شده', 'در انتظار پرداخت', 'لغو شده'] },
    date: { type: 'string' },
    price: { type: 'string' },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check