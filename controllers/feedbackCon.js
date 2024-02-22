import feedbackSchema from '../model/feedback.js';

const postFeedback= async(req,res)=>{
    try {
        const {name,rating,review}= req.body;

        
        const feed= new feedbackSchema({
            name,
            rating,
            review
        });
        
        const savedFeed= await feed.save();
        res.status(200).json({data:savedFeed})
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
}

const getFeedback=async(req,res)=>{
    try {
        const feedback= await feedbackSchema.find({});
        
        res.status(200).json({data:feedback});
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
}

export{postFeedback,getFeedback}