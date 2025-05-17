const mongoose = require('mongoose')
const env = require('dotenv').config()

const connectDatabase = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log('database connected')
    } catch (error) {
        console.log('database connection error',error)
    }
}
module.exports = connectDatabase