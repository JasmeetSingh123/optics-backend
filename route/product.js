import express from "express";
import {deleteProduct, getProduct,getSingleProduct,postProduct,postProductByCategory, updateProduct,getProductByCategory} from '../controllers/productCon.js'
import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";
import multer from "multer";
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();
const router= express.Router();


const storage = multer.diskStorage({});
const upload = multer({ storage });

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

router.route('/').post([authenticateUser,authorizePermissions('admin')],upload.single('image'),postProduct);
// router.route('/').post(upload.single('image'),postProduct);
router.route('/:page').get(getProduct);
router.route('/category').post(postProductByCategory);
router.route('/category/:category').get(getProductByCategory);
router.route('/:id').get(getSingleProduct).patch([authenticateUser,authorizePermissions('admin')],updateProduct)
.delete([authenticateUser,authorizePermissions('admin')],deleteProduct)
// router.route('/:id').get(getSingleProduct).patch(updateProduct)
// .delete(deleteProduct)



export default router