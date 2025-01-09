import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).send({
        messsage:'welcome to Backend'
    })
})





export default app