const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
router.post('/signup',userController.userSignup);
router.post('/login',userController.userLogin);
router.get('/profile/:id',userController.getUserProfile)
router.post('/profile/update/:id', upload.single('profilePic'), userController.updateProfile);
router.get('/userdata/:id',userController.getUserData)
module.exports =  router