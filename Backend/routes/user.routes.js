import express from 'express'
import { userController } from '../controllers/user.controller.js'


const userRoutes = express.Router()



userRoutes.get('/get-user/:id', userController.getUsers)

export default userRoutes