const validator = require('fastest-validator')

const v = new validator()

const schema = {

    title: { type: 'string', min: 3, max: 100 },
    price: { type: 'number', min: 0 },
    cover: { type: 'string', pattern: /^data:image\/(png|jpeg|jpg);base64,([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, max: 5242880 },
    href: { type: 'string', min: 3, max: 100 },
    discount: { type: 'number', optional: true, min: 0, max: 100 },
    categoryId: { type: 'string', pattern: /^[0-9a-fA-F]{24}$/ }
}

const check = v.compile(schema)

module.exports = check