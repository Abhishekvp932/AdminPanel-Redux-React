const mongoose = require('mongoose')
const {Schema} = mongoose

const adminSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Admin',adminSchema);