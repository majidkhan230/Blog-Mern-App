import mongoose from "mongoose";

async function connectDB(){
try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('db is sucessfully connected')
} catch (error) {
    console.error({
        message:"failed to connect to DB",
        error:error.message
    })
}    
}


export default connectDB;