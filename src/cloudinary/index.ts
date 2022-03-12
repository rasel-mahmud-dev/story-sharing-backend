
const { v2: cloudinary} = require("cloudinary");


export const cloudinaryHandler = ()=>{
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });
  
  return cloudinary
}



export const uploadImage = (imagePath: string, dir?: string)=>{
  return new Promise<{secure_url: string}>(async (resolve, reject)=>{
    try{
      let s = await cloudinaryHandler().uploader.upload(
        imagePath,
        {
          use_filename: true,
          unique_filename: false,
          folder: dir ? dir : ""
        })
      resolve(s)
    } catch (ex){
      // console.log(ex)
      reject(ex)
    }
  })
  
}


export default cloudinaryHandler