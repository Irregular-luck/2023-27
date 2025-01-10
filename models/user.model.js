const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength:[3,"Username must atleast contain 3 characters"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[5,"Username must atleast contain 5 characters"],
        
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength:[13,"Username must atleast contain 13 characters"],
        unique:true
    }
    
})
const user = mongoose.model('user',userSchema)
module.exports = user