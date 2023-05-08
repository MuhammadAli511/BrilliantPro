const express = require('express')
const router = express.Router()
const { getAllCarts, getSingleCart, getLimitCart, sortCart, getInrangeCarts, getCustomerCart, addNewCart, updateCart, deleteCart } = require('../controllers/cartController')
const {requireAuth} = require('../middleware/auth')

// GET  api/cartRoute/status/
router.get('/status', (req, res) => {
    res.status(200).send("App Status : Working (Cart)")
})

// GET  api/cartRoute/getAllCarts/
router.get('/getAllCarts', requireAuth,getAllCarts)

// GET  api/cartRoute/getSingleCart/:id
router.get('/getSingleCart/:id', requireAuth,getSingleCart)

// GET  api/cartRoute/getLimitCart/:limit
router.get('/getLimitCart/:limit', requireAuth,getLimitCart)

// GET  api/cartRoute/sortCart/:sort
router.get('/sortCart/:sort', requireAuth,sortCart)

// GET  api/cartRoute/getInrangeCarts/:gt/:lt
router.get('/getInrangeCarts/:gt/:lt', requireAuth,getInrangeCarts)

// GET  api/cartRoute/getCustomerCart/:customer
router.get('/getCustomerCart/:customer', requireAuth,getCustomerCart)

// POST  api/cartRoute/addNewCart/
router.post('/addNewCart', requireAuth,addNewCart)

// PUT  api/cartRoute/updateCart/:id
router.put('/updateCart/:id', requireAuth,updateCart)

// DELETE  api/cartRoute/deleteCart/:id
router.delete('/deleteCart/:id', requireAuth,deleteCart)


module.exports = router