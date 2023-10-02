const createError = require('http-errors')
const Users = require('../model/usermodel')
const {
  signAccessToken,
} = require('../helper/jwt_helper')
const authShema = require('../helper/validation_shema')


module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authShema.validateAsync(req.body)

      const doesExist = await Users.findOne({ email: result.email })
      if (doesExist)
        throw createError.Conflict(`${result.email} is already been registered`)

      const user = new Users(result)
      const savedUser = await user.save()
      const accessToken = await signAccessToken(savedUser.id)

      res.send({ savedUser,accessToken  })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authShema.validateAsync(req.body)
      const user = await Users.findOne({ email: result.email })
      if (!user) throw createError.NotFound('User not registered')

      const isMatch = await user.isvalidpassword(result.password)
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid')

      const accessToken = await signAccessToken(user.id)

      res.send({accessToken})
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
      next(error)
    }
  },
}
