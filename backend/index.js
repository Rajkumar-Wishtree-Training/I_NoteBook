const express = require('express')
const connectDatabase = require('./config/db')
const errorMiddleware = require('./middleware/error')
const app = express()
const port = 4000

//connect to database
connectDatabase()

app.use(express.json())
//connecting with routes
app.use('/api/v1',require('./routes/auth'))
app.use('/api/v1' , require('./routes/notes'))
app.use(errorMiddleware)
app.listen(port , () =>{
    console.log(`Example app listening on port ${port}`)
})