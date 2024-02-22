import mongoose from 'mongoose';

const postSchema= new mongoose.Schema({
    image_id : {
        type: String,
        required: true
    },
    caption : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    created_at : {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Post',postSchema);
