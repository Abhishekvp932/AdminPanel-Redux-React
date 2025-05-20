const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')
router.post('/login',adminController.AdminLoginPage)
router.get('/userData',adminController.fetchingUserData)
router.delete('/userDelete/:id',adminController.deleteuser)
router.put('/userUpdate/:id',adminController.userUpdate)
router.post('/addUser',adminController.addNewUser)
module.exports = router