const express = require('express')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const fetchUser = require('../middleware/fetchUser')
const router = express.Router()
const Note = require('../models/Notes')
const ErrorHandler = require('../utils/errorhandler')

//Create Note for logedin user login required
router.post('/createnote' , fetchUser ,  catchAsyncErrors( async (req , res , next) => {
    const note =await new Note({
        user : req.user._id,
        title : req.body.title,
        description : req.body.description,
        tag : req.body.tag
    })
    console.log(note , req.user._id);
    await note.save();
    await res.status(200).json({
        succeess : true,
        note
    })
}))  
//fetch all notes  login required.
router.get('/fetchallnotes' , fetchUser , catchAsyncErrors( async (req , res , next) =>{
    const notes = await Note.find({user : req.user._id})
    res.status(200).json({
        success : true,
        notes
    })
}))

// Update Note by id login Required
router.put('/update/:id' , fetchUser , catchAsyncErrors(async (req , res , next) => {
    let note = await Note.findById(req.params.id);
    if(!note){
       return next (new ErrorHandler('Note not found' , 404))
    }
    // console.log(note.user , req.user._id);
    if(note.user.toString() !== req.user._id){
       return next (new ErrorHandler('Not Authorized' , 401))
    }
    console.log(note);
    note = await Note.findByIdAndUpdate(note._id , req.body , {new : true , runValidators : true})
    res.status(200).json({
        success : true,
        note
    })
    
}))

module.exports = router
