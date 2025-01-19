import express from 'express'
import commmentController from '../controllers/comment.controller.js'


const commentRoutes = express.Router()



commentRoutes.post('/add', commmentController.addComment)
commentRoutes.get('/get/:id', commmentController.getComment)

export default commentRoutes