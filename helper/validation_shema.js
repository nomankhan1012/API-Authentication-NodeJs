const joi = require('@hapi/joi')
const authShema = joi.object({
     email: joi.string().trim().email().required(),
     password: joi.string().trim().min(2).required()
});

module.exports = authShema