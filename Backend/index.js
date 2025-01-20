import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
// app.use(cors({ 
//     origin: process.env.FRONTEND_URI, 
//     credentials: true }));
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URI,
}))


app.get("/", (req, res) => {
  res.status(200).send({
    messsage: "welcome to Backend",
  });
});


app.use("/api/auth/",authRoutes)
app.use("/api/user/",userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/blog',blogRoutes)
app.use('/api/comment',commentRoutes)
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).send({
    sucess:false,
    statusCode: statusCode,
    message: message
})})

const PORT =process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server is sucessfully running on ${PORT}`)
})


mongoose.connect(process.env.MONGODB_URI)
.then(
  console.log('db is sucessfully connected')
)
.catch((error)=>{
  console.error({
    message:"failed to connect to DB",
    error:error.message
})
})



export default app;



