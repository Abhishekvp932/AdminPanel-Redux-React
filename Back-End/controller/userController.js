const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const {hashPassword,checkPassword}  = require('../Helpers/bycript')
const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email: email });
    if (existing) {
      return res.status(409).json({ msg: "User already exists" });
    }
    const hashedPassword = await hashPassword(password)
    const newUser = await User.create({
      name,
      email,
      password : hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({
        msg: "User signup successfully",
        token,
        user: { _id: newUser._id, name: newUser.name, email: newUser.email },
      });
  } catch (error) {
    console.log("server error", error);
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "The user is not exists" });
    }
    console.log(user);

    const isPasswordValid = await checkPassword(password,user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Password is not match" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({
        msg: "User logged successfully",
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    console.log("server error", error);
    return res.status(500).json({ msg: "user login error" });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    console.log(user);
    return res.status(200).json({ user });
  } catch (error) {
    console.log("user data fetching error", error);
    res.status(500).json({ msg: "server error" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    
   const user = await User.findOne({_id:id})
   const updateData = {
    name : req.body.name,
    email : req.body.email,
    profilePic:req.file ? req.file.filename : user.profilePic
   }

   const updateUser = await User.findByIdAndUpdate(id,updateData,{
    new:true
   })
    if (!updateUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({
      msg: "Profile updated successfully",
      user: updateUser,
    });
  } catch (error) {
    console.error("profile updating error", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getUserData = async(req,res)=>{
  try {
    
    const id = req.params.id
   const user = await User.findById({_id:id})
   if(!user){
    return res.status(400).json({msg:'user not found'})
   }
   return res.status(200).json({user})
  } catch (error) {
    console.log('user data fetching error in header',error)
      return res.status(500).json({msg:'internal server error'})
  }
}
const takeUserData = async(req,res)=>{
  try {
    const {id} = req.params
     const user = await User.findById(id);
   if(!user){
    return res.status(404).json({msg:'user not found'})
   }
   return res.status(200).json({msg:"user data taken successfully",user})
  } catch (error) {
   console.log('user data taking error',error); 
  }
}
module.exports = {
  userSignup,
  userLogin,
  getUserProfile,
  updateProfile,
  getUserData,
  takeUserData,
};
