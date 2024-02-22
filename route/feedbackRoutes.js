import express from 'express';
import { getFeedback, postFeedback } from '../controllers/feedbackCon.js';

const router = express.Router();


router.route('/').post(postFeedback);
router.route('/').get(getFeedback);



export default router
