import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import orderRouter from './routers/orderRouter.js'

mongoose.connect(process.env.MONGODB_URL ||'mongodb://127.0.0.1:27017/amazon', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
    console.log('Database Connected')
}).catch((e) => {
    console.log(e.message)
})


app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL)
})
app.use((err, req, res, next) => {
    res.status(500).send({ message:err.message })
})

const port = process.env.PORT || 1000

app.listen(port, () => {
    console.log(`server running at ${port}`)
})