const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath){
            console.log("no file path for upload")
            return null
        }
        console.log("Uploading file to cloudinary",localFilePath)   
        const response = await cloudinary.uploader.upload(localFilePath,{
            
            resource_type: 'image',
            allowed_formats: ['jpg', 'png', 'svg', 'gif']
           
        })
        console.log("File is uploaded on cloudinary",response.url)
        return response
        

    }
    catch(error){
        fs.unlinkSync(localFilePath)
        console.log("Error during file upload on cloudinary",error)
        return null

    }

}


module.exports = uploadOnCloudinary