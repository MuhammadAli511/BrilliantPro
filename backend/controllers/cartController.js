const asyncHandler = require('express-async-handler')
const Cart = require('../models/cart')
require('dotenv').config()

const getAllCarts = asyncHandler(async(req,res) => {
    const carts = await Cart.find({})
    const data = {
        status: 200,
        carts: carts
    }
    res.status(200).json(data)
})

const getSingleCart = asyncHandler(async(req,res) => {
    const cart = await Cart.findOne({id: req.params.id})
    const data = {
        status: 200,
        cart: cart
        }
        res.status(200).json(data)
})

const getLimitCart = asyncHandler(async(req,res) => {
    const carts = await Cart.find({}).limit(req.params.limit)
    const data = {
        status: 200,
        carts: carts
    }
    res.status(200).json(data)
})

const sortCart = asyncHandler(async(req,res) => {
    const carts = await Cart.find({}).sort(req.params.sort)
    const data = {
        status: 200,
        carts: carts
    }
    res.status(200).json(data)
})

const getInrangeCarts = asyncHandler(async(req,res) => {
    const carts = await Cart.find({}).where('price').gt(req.params.gt).lt(req.params.lt)
    const data = {
        status: 200,
        carts: carts
    }
    res.status(200).json(data)
})

const getCustomerCart = asyncHandler(async(req,res) => {
    const carts = await Cart.find({customer: req.params.customer})
    const data = {
        status: 200,
        carts: carts
    }
    res.status(200).json(data)
})

const addNewCart = asyncHandler(async(req,res) => {
    const lastId = await Cart.findOne().sort({id:-1})
    let newId = 0
    if(lastId){
        newId = lastId.id
    }
    newId++
    req.body.id = newId

    const cart = new Cart({
        id: req.body.id,
        customer: req.body.customer,
        products: req.body.product,
        price: req.body.price
    })
    const newCart = await cart.save()
    const data = {
        status: 200,
        cart: newCart
    }
    res.status(200).json(data)
})

const updateCart = asyncHandler(async(req,res) => {
    const cart = await Cart.findOne({id: req.params.id})
    if(cart){
        cart.id = req.body.id || cart.id
        cart.customer = req.body.customer || cart.customer
        cart.product = req.body.product || cart.product
        cart.price = req.body.price || cart.price
        const updatedCart = await cart.save()
        const data = {
            status: 200,
            cart: updatedCart
        }
        res.status(200).json(data)
    }else{
        const data = {
            status: 404,
            message: 'Cart not found'
        }
        res.status(404).json(data)
    }
})

const deleteCart = asyncHandler(async(req,res) => {
    const cart = await Cart.findOne({id: req.params.id})
    if(cart){
        await cart.remove()
        const data = {
            status: 200,
            message: 'Cart removed'
        }
        res.status(200).json(data)
    }else{
        const data = {
            status: 404,
            message: 'Cart not found'
        }
        res.status(404).json(data)
    }
})


module.exports = {
    getAllCarts,
    getSingleCart,
    getLimitCart,
    sortCart,
    getInrangeCarts,
    getCustomerCart,
    addNewCart,
    updateCart,
    deleteCart
}