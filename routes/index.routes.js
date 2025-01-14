const express = require('express')
const router = express.Router()

const upload = require('../middleware/multer') 
const uploadOnCloudinary = require('../utils/cloudinary')
const fs = require('fs').promises

router.get('/home',(req,res)=>{
    res.render('home')
})
router.post('/upload',upload.single('file'),async (req,res)=>{

    try{
        if(!req.file){
            return res.status(400).json({
                message:'No File Uploaded'
            })

        }
        const localFilePath = req.file.path //path to local server
          //upload file to cloudinary
        
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath)
        if(!cloudinaryResponse){
            
            return res.status(500).json({message:"Failed to Upload to Cloudinary"})
            
        }
       await fs.unlink(localFilePath)

        res.json({
            message:'File Uploaded successfully!',
            url: cloudinaryResponse.url,
        })
    }
    catch(error){
        console.error("error during the file upload ",error)
        res.status(500).json({message:'internal server error'})

    }


})



module.exports = router