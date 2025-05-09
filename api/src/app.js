import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


const app = express()


app.use(cors({
    origin : "*",
    credentials : true
}))
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/",(req,res) => {
  res.json("app is ready")
}
)

import authRouter from '../routes/user.route.js'

app.use('/v1/api/user',authRouter)

export default app
