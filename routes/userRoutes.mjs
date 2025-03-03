import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import auth from '../middleware/auth.mjs';
import userModel from '../model/user.mjs';  
const userRouter = express.Router();
userRouter.post('/register',async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const newUser = new userModel({
            name,
            email,
            password
        })
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
})
userRouter.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await userModel.findOne({ email: req.body.email });
        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({userId:user._id},"jon",{expiresIn:'20m'});
        res.json({token});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
})
userRouter.get('/', auth, async (req, res) => {
    try {
        console.log("Decoded User:", req.user);
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Invalid user token" });
        }

        const user = await userModel.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default userRouter;
