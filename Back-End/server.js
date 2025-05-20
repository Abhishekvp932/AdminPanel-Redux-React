const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const DB = require('./DB/connectDB')
const userRouter = require('./router/userRouter')
const adminRotuer = require('./router/adminRouter');
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()


app.use(cors({
  origin:'http://localhost:1010'
}))
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth',userRouter);
app.use('/api/admin',adminRotuer)
DB()
app.listen(2323,()=>{
    console.log('server 2323 is running')
})