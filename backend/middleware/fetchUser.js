var jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const fetchUser = catchAsyncErrors(async(req , res , next) => {
    const token =  req.header('Authorization');
    if(!token){
     return  next(new ErrorHandler('Invalid token' , 400))
    }
    const data = jwt.verify(token , 'secret_key')
    req.user = data
    console.log(req.user);
    next()
})
module.exports = fetchUser