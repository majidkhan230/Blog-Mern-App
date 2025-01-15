import express from 'express'
import categoryController from '../controllers/category.controller.js'


const categoryRoutes =  express.Router()



categoryRoutes.post("/add",categoryController.addCategory)
categoryRoutes.put("/update/:categoryId",categoryController.updateCategory)
categoryRoutes.get("/show/:categoryId",categoryController.showCategory)
categoryRoutes.get("/delete/:categoryId",categoryController.deleteCategory)
categoryRoutes.get("/all-category",categoryController.getAllCategory)


export default categoryRoutes