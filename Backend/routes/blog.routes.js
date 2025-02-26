import express from 'express'
import blogController from '../controllers/blog.controller.js'
import upload from '../config/multer.js'


const blogRoutes =  express.Router()



blogRoutes.post("/add",upload.single('featuredImage'),blogController.addBlog)
blogRoutes.put("/update/:blogId",upload.single('file'),blogController.updateBlog)
blogRoutes.get("/show/:blogId",blogController.showBlog)
blogRoutes.delete("/delete/:blogId",blogController.deleteBlog)
blogRoutes.get("/all-blogs",blogController.getAllBlog)
blogRoutes.get("/get-blog/:slug",blogController.getBlog)
blogRoutes.get("/edit-blog/:blogId",blogController.editBLog)
blogRoutes.get("/get-related-blog/:category/:slug",blogController.getRelatedBlog)
blogRoutes.get("/get-related-blogs/:category",blogController.getRelatedBlogsByCategory)
blogRoutes.get('/search', blogController.search)


export default blogRoutes