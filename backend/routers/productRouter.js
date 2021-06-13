import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Product from '../models/productModal.js'


const router = express.Router()

router.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.send(products)
}))

router.get('/seed', expressAsyncHandler(async (req, res) => {
    const createProducts = await Product.insertMany(data.products)
    res.send({createProducts})
}))

router.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message:"product not found"})
    }
}))


export default router