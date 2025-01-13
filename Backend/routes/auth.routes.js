import express from 'express'
import authController from '../controllers/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/register', authController.register)
authRoutes.post('/login', authController.login)
authRoutes.get('/logout', authController.logout)



export default authRoutes