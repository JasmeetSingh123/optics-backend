import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';


const userSchema= new mongoose.Schema({
    name : {
        type: String,
        required: [true,'please provide name'],
        min : 5,
        max : 255
    },
    email : {
        type: String,
        unique: true,
        required: [true,'please provide email'],
        validate:{
            validator: validator.isEmail,
            message: 'please provide valid email'
        },
    },
    password : {
        type: String,
        required: [true,'please provide password'],
        min : 5,
        max : 1024
    },
    role: {
        type: String,
        enum: ['admin','user'],
        default: 'user'
    },
    created_at : {
        type: Date,
        default: Date.now
    }

});

userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.comparePassword= async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch
}

export default mongoose.model('User',userSchema);
