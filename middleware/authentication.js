import e from "express";
import { isTokenValid } from "../utils/jwt.js";

const authenticateUser= async(req,res,next)=>{
    const token= req.signedCookies.token;
    // console.log("token "+token+" "+req)
    if (!token){

        res.status(400).json({msg: "authentication invalid"})
    }
    // else{
    //     console.log("token present")
    // }
    // next()

    try{
        const {name,userid,role}=  isTokenValid({token})
        // const payload=  isTokenValid({token})
        req.user= {name,userid,role};
        // console.log(payload)
        
        next();
    } catch(error){
        console.log(error)
    }
    
}
const authorizePermissions= (...roles)=>{
    return (req,res,next)=>{
        console.log(req.user.role)
        if (!roles.includes(req.user.role)){
            throw new e
        }
        next()
    }
}


export  {authenticateUser,authorizePermissions};
