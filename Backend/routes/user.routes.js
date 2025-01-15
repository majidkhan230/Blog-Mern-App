import express from 'express'
import { userController } from '../controllers/user.controller.js'
import upload from '../config/multer.js'


const userRoutes = express.Router()



userRoutes.get('/get-user/:id', userController.getUsers)
userRoutes.post('/update-user/:id', upload.single('avatar'),userController.updateUser)

export default userRoutes