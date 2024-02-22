import mongoose from 'mongoose';

const heroSchema= new mongoose.Schema({
    image_id : {
        type: String,
        required : true
    },
    title : {
        type: String,
        required: [true,'please enter title ']
    },
    description : {
        type: String,
        required: [true,'please enter description ']
    },
    created_at : {
        type: Date,
        default: Date.now
    }

})

export default heroSchema;