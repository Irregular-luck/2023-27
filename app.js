const express=require('express')
const userRouter = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index.routes')

const dotenv = require('dotenv')
dotenv.config();//use to make MONGO_URI a global variable

const connectToDB = require('./config/db')
connectToDB();



const app=express()

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',indexRouter)
app.use('/user',userRouter)


app.listen(3000,()=>{
    console.log("Server is running on 3000")
})