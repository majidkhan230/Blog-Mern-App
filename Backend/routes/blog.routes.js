import express from 'express'
import blogController from '../controllers/blog.controller.js'
import upload from '../config/multer.js'


const blogRoutes =  express.Router()



blogRoutes.post("/add",upload.single('featuredImage'),blogController.addBlog)
blogRoutes.put("/update/:blogId",blogController.updateBlog)
blogRoutes.get("/show/:blogId",blogController.showBlog)
blogRoutes.delete("/delete/:blogId",blogController.deleteBlog)
blogRoutes.get("/all-blogs",blogController.getAllBlog)
blogRoutes.get("/get-blog/:slug",blogController.getBlog)


export default blogRoutes