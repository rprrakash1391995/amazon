import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModal.js'
import { auth } from '../utils/utils.js'
const router = express.Router()

router.get('/mine', auth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.send(orders)
}))

router.post('/', auth, expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
       return res.status(400).send({message:"Cart is empty"})
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user:req.user._id
        })

        const createdOrder = await order.save()
        res.status(201).send({message:'New order Created', order:createdOrder})
    }
}))

router.get('/:id', auth, expressAsyncHandler(async (req, res) => {
    // console.log(req.params.id)
    const order = await Order.findById(req.params.id)
    // console.log(order)
    if (order) {
        res.send(order)
    } else {
        res.status(401).send({message:"Order Not Found"})
    }
}))

router.put('/:id/pay', auth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status : req.body.status,
            update_time: req.body.update_time,
            email_address : req.body.email_address
        }
        const updatedOrder = await order.save()
        res.send({message:"Order Paid", order:updatedOrder})
    } else {
        res.status(404).send({message:"Order not found"})
    }
}))

export default router