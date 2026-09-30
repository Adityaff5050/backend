require('dotenv').config

const app =require('./src/app')

port=3000
const connectToDb = require('./src/config/database')



connectToDb()




app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})