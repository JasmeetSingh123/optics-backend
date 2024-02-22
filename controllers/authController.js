import User from '../model/user.js';
import {StatusCodes} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { createJWT,attachCookiesToResponse } from '../utils/jwt.js';


const register= async (req,res)=>{
    const {name,email,password}= req.body;
    const emailAlreadyExist= await User.findOne({email})
    if (emailAlreadyExist){
        res.status(400).send('email already exist');
    }

    const isFirstAccount= (await User.countDocuments({}))===0
    const role= isFirstAccount? 'admin':'user';

    const user= await User.create({name,email,password,role});

    const tokenUser= {name: user.name, userid: user._id , role: user.role};
    const token=createJWT({payload:tokenUser});

    
    attachCookiesToResponse( { res,user:tokenUser})
    

    res.status(StatusCodes.CREATED).json({user: tokenUser})
}

const login= async (req,res)=>{
    const {email,password}= req.body
    
    if (!email || !password){
        return res.status(400).send("please provide email and password");
    }

    const user= await User.findOne({email})
    console.log('user',typeof user._id,user._id)
    if (!user ){
        return res.status(200).send('invalid credential')
    }

    const isPasswordCorrect= await user.comparePassword(password);
    if (!isPasswordCorrect){
        return res.status(200).send('invalid credential')
    }

    const tokenUser= {name: user.name, userid: user._id, role: user.role};
    
    attachCookiesToResponse({ res,user:tokenUser})    

    res.status(StatusCodes.CREATED).json({user: tokenUser})
}

const logout= async (req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires: new Date(Date.now() + 5 *1000),
    })
    res.status(StatusCodes.OK).json({msg:"user logged out!"})
}

export {register,login,logout}