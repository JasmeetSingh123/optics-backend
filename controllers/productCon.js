import productSchema from '../model/products.js';
import url from 'url';
import { StatusCodes } from 'http-status-codes';
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";





const postProduct= async (req,res)=>{
    const file = req.file;
    let imgurl;
    let public_id;

    console.log(req.file)

    await cloudinary.uploader.upload(file.path, (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          return res.status(500).json({ error: 'Failed to upload image' });
        }
    
        // Save image information to MongoDB
        imgurl=result.secure_url;
        public_id=result.public_id;

      });



    const product= new productSchema({
        category: req.body.category,
        url: imgurl,
        public_id: public_id,
        description: req.body.description,
        shape: req.body.shape,
        gender: req.body.gender,
        price: req.body.price
    })
    try{
        const savedproduct= await product.save();
        res.status(200).json({product : savedproduct._id});
    }catch(err){
        console.log(err);
        res.status(400).json({err})
    }
     // Delete the temporary file from the server
     fs.unlinkSync(file.path);
}

const getProduct= async(req,res)=>{
    
    try{
        //const products = await productSchema.find({});

        const pagination = parseInt(req.params.page) || 0
        console.log(req.params.page)
        const paginationLimit = 20

        const products= await productSchema.find({}).skip(pagination * paginationLimit).sort({"createdAt": -1}).limit(paginationLimit);

        res.status(200).json({success: true, data: products})

    }catch(error){
        res.status(500).json({ success: false, message: error})
    }

}

const postProductByCategory= async (req,res)=>{
    try{
        const category=req.body.category;
        const products = await productSchema.find({category:category});

        res.status(200).json({success: true, data: products})

    }catch(error){
        res.status(500).json({ success: false, message: error})
    }
}

const getProductByCategory= async (req,res)=>{
    try{
        const category=req.params.category;
        const products = await productSchema.find({category:category});

        res.status(200).json({success: true, data: products})

    }catch(error){
        res.status(500).json({ success: false, message: error})
    }
}

const getSingleProduct = async (req,res)=>{
    try{
        const id= req.params.id
        const product= await productSchema.findOne({_id:id})
        // console.log(product);
        if(!product){
            res.status(400).json({msg:"product not found"})
        }
        else{

            res.status(StatusCodes.OK).json({product})
        }
    }catch(e){
        console.log("Error is here");
        res.status(500).json({msg:e})
    }
}

const updateProduct= async (req,res)=>{
    try{
        const id = req.params.id
        const product= await productSchema.findOneAndUpdate({_id:id},req.body,{
            new: true,
            runValidators:true
        })
        if(!product){
            res.status(400).json({msg:"product not found"})
        }
        res.send("product updated")
    }catch(e){
        res.status(400).json({msg:e})
    }
}

// const deleteProduct = async (req,res)=>{
//     const id= req.params.id
//     const product= await productSchema.findOne({_id:id})
//     if(!product){
//         res.status(400).json({msg:"product not found"})
//     }
//     await product.remove();
//     res.send('product deleted')

// }

const deleteProduct = async (req, res) => {
    const id = req.params.id;
  
    try {
      // Find the product in the database
      const product = await productSchema.findOne({ _id: id });
  
      // Check if the product exists
      if (!product) {
        return res.status(400).json({ msg: "Product not found" });
      }
  
      // Get the public ID of the image from the product data
      const imagePublicId = product.public_id;
  
      // Remove the product from the database
      await product.remove();
  
      // If the product had an associated image, delete it from Cloudinary
      if (imagePublicId) {
        const cloudinaryResult = await cloudinary.uploader.destroy(imagePublicId);
  
        // Check the Cloudinary deletion result
        if (cloudinaryResult.result !== 'ok') {
          console.error('Failed to delete image from Cloudinary');
          return res.status(500).json({ msg: 'Failed to delete image' });
        }
      }
  
      res.send('Product deleted');
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };
  



export {postProduct,getProduct,postProductByCategory,getSingleProduct,updateProduct,deleteProduct,getProductByCategory}