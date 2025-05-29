
const Admin = require('../model/adminSchema')
const User = require('../model/userSchema')
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const {hashPassword,checkPassword}  = require('../Helpers/bycript')
const AdminLoginPage = async(req,res)=>{
    try {
        const {email,password} = req.body
        

        const admin = await Admin.findOne({email:email})
        if(!admin){
            return res.status(400).json({msg:"admin not exists"})
        }
        if(admin.password !== password){
            return res.status(400).json({msg:"password is not match"})
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
              expiresIn: "1h",
            });
    return res.status(200).json({msg:'admin loggind successfully',admin:{ _id:admin._id,email:admin.email},token})
    } catch (error) {
        console.log('admin loggined error',error)
        return res.status(500).json({msg:'internal server error'})
    }
}
const fetchingUserData = async(req,res)=>{
    try {
        const userData = await User.find({})
        return res.status(200).json({msg:'user data fetched successfully',userData})
    } catch (error) {
        console.log('user data fetching error',error)
        return res.status(500).json({msg:'internal server error'})
    }
}
const deleteuser = async(req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        await User.findByIdAndDelete(id)

        return res.status(204).json({msg:'user deleted successfully'})
    } catch (error) {
        console.log('user deleting error',error)
        return res.status(500).json({msg:'internal server error'})
    }
}
const userUpdate = async(req,res)=>{
    try {
        const id = req.params.id
        const {name,email} = req.body
        
        const update = await User.findByIdAndUpdate(id,{name,email})
        return res.status(200).json({msg:'user updated successfully'})
    } catch (error) {
        console.log('user updating error',error)
        return res.status(500).json({msg:'server error'})
    }
}
const addNewUser = async(req,res)=>{
    try {
        console.log('1')
       const {name,email,password} = req.body
       console.log(req.body)
       const user = await User.findOne({email:email})
       if(user){
          return res.status(400).json({msg:'user already exists'})
       }
       const hashedPassword = await hashPassword(password)
       const newuser = {
         email:email,
         name:name,
         password:hashedPassword,
       }
       await User.insertMany(newuser)

       return res.status(200).json({msg:'user add successfully'})

    } catch (error) {
        console.log('new user adding error',error)
        return res.status(500).json({msg:'server error'})
    }
}
module.exports = {
    AdminLoginPage,
    fetchingUserData,
    deleteuser,
    userUpdate,
    addNewUser
}