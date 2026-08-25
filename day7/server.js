const mongoose = require('mongoose')
const app = require('./src/app')
require('dotenv').config();
const connectToDb = require('./src/config/database')
const port =3000



connectToDb()



app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})