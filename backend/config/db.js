const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/I_Notebook'

const connectDatabase = () =>{
    mongoose.connect(mongoURI).then((data) =>{
        console.log(`database is connected on host ${data.connection.host}`);
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDatabase