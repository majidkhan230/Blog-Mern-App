import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import commentRoutes from "./routes/comment.routes.js";

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



export default app;



