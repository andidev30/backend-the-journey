const express = require('express')
const router = express.Router()

//midleware
const authenticated = require('../middleware/authenticated');

//helpers
const {
    profileUploader
} = require('../helpers/profileUploader');
const {
    ckeditorUploader
} = require('../helpers/ckeditorUploader')

//login
const authController = require('../controllers/authController');
router.post('/register', authController.register)
router.post('/login', authController.login)

//journeys
const journeyController = require('../controllers/journeyController');
router.get('/journeys', journeyController.reads)
router.get('/journey-by-user', authenticated.cekToken, journeyController.reads)
router.get('/journey/:id', journeyController.read)
router.post('/journey', authenticated.cekToken, ckeditorUploader, journeyController.create)

//bookmark
const bookmarkController = require('../controllers/bookmarkController');
router.post('/bookmark', authenticated.cekToken, bookmarkController.create)
router.get('/bookmark-by-user', authenticated.cekToken, bookmarkController.readByUser)

//users
const userController = require('../controllers/userController');
router.put('/change-avatar', authenticated.cekToken, profileUploader, userController.changeAvatar)
router.get('/user', authenticated.cekToken, userController.read)


// router.post('/editor-image', ckeditorUploader, journeyController.postImage)
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart({uploadDir: './uploads'});
// router.post('/editor-image', multipartMiddleware, (req, res) => {
//     const image = "http://localhost:5000/uploads/" + req.files.upload.originalFilename
//     res.send({
//         data: image,
//         reqs: req.body
//     })
// })


module.exports = router