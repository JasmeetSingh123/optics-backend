import mongoose from 'mongoose';

const productSchema= new mongoose.Schema({
    category : {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    },
    public_id : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    shape : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    price : {
        type: String,
    },
    created_at : {
        type: Date,
        default: Date.now
    }

})

export default mongoose.model('Products',productSchema);