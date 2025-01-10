const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const userModel= require('/Drive/models/user.model')
const jwt =  require('jsonwebtoken')

router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:2}),
    body('username').trim().isLength({min:3}),
    async (req,res)=>{
        const errors = validationResult(req)
        console.log(errors)
        if(!errors.isEmpty())
   {
     return res.status(400).json({
      errors: errors.array(),
      message:'Invalid Data'
     })
   }
   const {username,password,email} = req.body
   console.log(password)

   const hashPassword =await bcrypt.hash(password,10)
   console.log(hashPassword)
   const newUser = await userModel.create({
    username:username,
    password:hashPassword,
    email:email

   })
   res.json(newUser)
  
   })
  router.get('/login',(req,res)=>{
    res.render('login')
  })
  router.post('/login',body('password').trim().isLength({min:2}),
  body('username').trim().isLength({min:3}),
  async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
      return res.status(400).json({
        error:errors.array(),
        message:'Invalid Data'
      })


    }
    const{ username, password }=req.body

    const user = await userModel.findOne({
      username:username,
      

    })
    if(!user)
     { 
      return res.status(400).json({
    message:'Username or Password is Incorrect'
    
    })
  }
  const isMatch = await bcrypt.compare(password,user.password)
  
  


  if(!isMatch)
  {
    return res.status(400).json({
      message:'Username or Password is Incorrect'
    })
  } 
const token = jwt.sign({
  userId:user._id,
  username:user.username,
  email:user.email
  
},
process.env.JWT_SECRET,
)
res.cookie('token',token)

res.send("Logged in")
  })


   
   

module.exports=router