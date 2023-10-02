const express = require('express')
const router = express.Router()
const AuthController = require('../controller/auth.controler')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)


router.delete('/logout', )

module.exports = router