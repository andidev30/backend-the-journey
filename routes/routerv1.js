const express = require('express')
const router = express.Router()

//login
const authController = require('../controllers/authController');
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router