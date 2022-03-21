const bcrypt = require('bcryptjs/dist/bcrypt')
const express = require('express')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const fetchUser = require('../middleware/fetchUser')
const router = express.Router()
const User = require('../models/User')

const ErrorHandler = require('../utils/errorhandler')

//Create user using post "api/auth/create" Doesn't require Login
router.post('/create' ,  catchAsyncErrors(async(req , res , next) => {
    //creating a instance of User
    let user = await new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    });  
    //getting token from User
    const token =await user.getAuthToken();
    user.token = token;
    await user.save();
    res.status(200).json({
        success : true,
        user
    })
}))
//login user using post "api/auth/login" Doesn't require Login
router.post('/login' , catchAsyncErrors(async (req , res , next) => {
    let {email , password} = req.body;
    console.log(email , password);
    const user =await User.findOne({email}) 
    if(!user){
        return next(new ErrorHandler('Invalid Credentials' , 400))
    }
    const pwdCompare = await bcrypt.compare(password , user.password) 
    if(!pwdCompare){
        return next(new ErrorHandler('Invalid Credentials' , 400))
    }
    const token =await user.getAuthToken();
    user.token = token;
    await user.save();
    res.status(200).json({
        success : true,
        user
    })
}))
//get logeid in user login required.
router.post('/getuser' , fetchUser , catchAsyncErrors(async (req , res , next) => {
    const user = req.user
    console.log(user);
    res.json({
        success : true,
        user
        
    })
    
}))
module.exports = router