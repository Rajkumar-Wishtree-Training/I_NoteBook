const mongoose = require('mongoose')
var validator = require('validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Please Enter name'],
        trim : true
    },
    email : {
        type : String,
        required : [true , 'please Enter Email'],
        unique : [true , 'email already exist'],
        trim :  true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please Enter Valid Email')
            }
        }
    },
    password : {
        type : String,
        required : [true , 'please Enter Password'],
        minlength : [6 , 'password must contain atleast 7 charactes']
    },
    date :{
        type : Date,
        default : Date.now
    },
    token : {
        type : String,
        required : true
    }
})

UserSchema.methods.getAuthToken = async function () {
    const token = jwt.sign(JSON.stringify(this) , 'secret_key');
    return token;
}

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(this.password , salt);
        this.password = secPass;
    }
    next()
})

module.exports = mongoose.model('User' , UserSchema)