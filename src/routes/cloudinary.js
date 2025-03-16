import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
  secure: true ,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
});


const uploadImage = async (imagePath) => {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      const result = await cloudinary.uploader.upload(imagePath, options);
      return result 
    } catch (error) {
      console.error(error);
    }
};






 const cloudinary_nube =  async (img) => {
    const imagePath = img;
    // Upload the image
    const url_img = await uploadImage(imagePath);
    return    url_img 

}

export default cloudinary_nube ;