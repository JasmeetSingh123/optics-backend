import express from 'express';
import { getAllUser,getSingleUser,updateUser,updateUserPassword,showCurrentUser } from '../controllers/userController.js';
import {authenticateUser,  authorizePermissions } from '../middleware/authentication.js';


const router = express.Router();
router.route('/').get(authenticateUser,authorizePermissions('admin','owner'),getAllUser);
// router.route('/').get(authenticateUser,getAllUser);

router.route('/showMe').get(authenticateUser ,showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(authenticateUser,updateUserPassword);
router.route('/:id').get(authenticateUser,getSingleUser);

export default router