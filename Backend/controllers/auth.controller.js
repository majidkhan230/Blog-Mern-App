import errorHandler from "../helpers/error.handler.js";
import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt'

const register = async (req,res,next)=>{
    try {
        
        const user = await userModel.findOne({ email:req.body.email });

        // if(user){
        //     return res.status(400).send({
        //         success:false,
        //         message:"email already exists"
        //     })
        // }

        if(user){
         return  next(errorHandler(409,'User already exists'))
        }



        const hashPassword = await bcrypt.hash(req.body.password,10)
        

        const newUser  = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })

        
        
        

        res.status(201).send({
            success:true,
            message: "User registered successfully",
            user: newUser
        })



    } catch (error) {
       next(errorHandler(error))
    }
}





const authController = {register}

export default authController