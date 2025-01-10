const express = require('express')
const router = express.Router()
const { upload } = require('../config/db')


router.get('/home',(req,res)=>{
    res.render('home')
})



module.exports = router