import connectDB from './db/configDB.js'
import app from './index.js'

const PORT =process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server is sucessfully running on ${PORT}`)
    connectDB()
})