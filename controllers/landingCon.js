import landingSchema from "../model/landingPage.js";
import Joi from "joi"; 



const postLanding= async(req,res)=>{
    
    const landing = new landingSchema({
        heroSection: {
            image_id: req.body.hero_image_id,
            title: req.body.hero_title,
            description: req.body.hero_description
        },
        featureSection: {
            image_id: req.body.feature_image_id,
            title: req.body.feature_title,
            description: req.body.feature_description
        }
    })
    try{
        const savedLanding= await landing.save();
        res.status(200).json({landing : savedLanding._id});
    }catch(err){
        console.log(err);
        res.status(400).json({err})
    }
}

const getLanding = async(req,res)=>{
        try{
            const landingPage = await landingSchema.find({});
    
            res.status(200).json({success: true, data: landingPage})
    
        }catch(error){
            res.status(500).json({ success: false, message: error})
        }

}


export {postLanding,getLanding}

