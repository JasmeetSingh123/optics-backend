import User from '../model/user.js';
import { StatusCodes } from 'http-status-codes';



const getAllUser= async (req,res)=>{
    console.log(req.user)
    const users= await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({users})
}

const getSingleUser= async (req,res)=>{
    console.log(req.user)
    const id= req.params.id
    const user= await User.findOne({_id:id}).select('-password')

    if(!user){
        res.status(400).json({msg: "invalid id"})
    }

    res.status(StatusCodes.OK).json({user})
}

const showCurrentUser= async (req,res)=>{
    res.status(StatusCodes.OK).json({name: req.user.name,role: req.user.role})
}

const updateUser= (req,res)=>{
    res.send('update user')
}

const updateUserPassword= (req,res)=>{
    const {oldPassword,newPassword}= req.body;
    if(!oldPassword || !newPassword){
        res.status(400).json({msg:"please fill details"})
    }
}

export {getAllUser,getSingleUser,showCurrentUser,updateUser,updateUserPassword}

