const User = require('../model/userSchema')

const userSignup = async(req,res)=>{
    try {
        const {name,email,password} = req.body
       const existing = await User.findOne({email:email})
       if(existing){
        return res.status(400).json({msg:'User already exists'})
       }
       const newUser = {
        name,
        email,
        password
       }
       await User.insertMany(newUser)
         res.status(201).json({msg:'User signup successfully',newUser})
    } catch (error) {
        console.log('server error',error)

    }
}
const userLogin = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = User.findOne({email:email})
        if(!user){
            return res.status(400).json({msg:'The user is not exists'})
        }
        if(user.password !== password){
            return res.status(400).json({msg:'Password is not match'})
        }
         
        return res.status(201).json({msg:'User logged successfully'})
    } catch (error) {
        console.log('server error',error)
        return res.status(500).json({msg:'user login error'})
    }
}
module.exports = {
    userSignup,
    userLogin
}