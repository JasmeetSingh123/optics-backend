import express from "express";
import {getLanding,postLanding} from '../controllers/landingCon.js'

const router= express.Router();

router.route('/').post(postLanding);
router.route('/').get(getLanding);



export default router