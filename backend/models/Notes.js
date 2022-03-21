const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    title :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag:{
        type : String,
        default : 'general'
    },
    date:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Note' , NotesSchema)