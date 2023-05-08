const express = require('express')
const router = express.Router()
const {signup, login, getAllCustomers, getSingleCustomer, getLimitCustomers, sortCustomers, updateCustomers, deleteCustomers} = require('../controllers/customerController')
const {requireAuth} = require('../middleware/auth')

// GET  api/customerRoute/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working (Customer)")
})

// POST  api/customerRoute/signup/
router.post('/signup',signup)

// POST  api/customerRoute/login/
router.post('/login',login)

// GET  api/customerRoute/getAllCustomers/
router.get('/getAllCustomers',requireAuth,getAllCustomers)

// GET  api/customerRoute/getSingleCustomer/:email
router.get('/getSingleCustomer/:email',requireAuth,getSingleCustomer)

// GET  api/customerRoute/getLimitCustomers/:limit
router.get('/getLimitCustomers/:limit',requireAuth,getLimitCustomers)

// GET  api/customerRoute/sortCustomers/:sort
router.get('/sortCustomers/:sort',requireAuth,sortCustomers)

// PUT  api/customerRoute/updateCustomers/:email
router.put('/updateCustomers/:email',requireAuth,updateCustomers)

// DELETE  api/customerRoute/deleteCustomers/:email
router.delete('/deleteCustomers/:email',requireAuth,deleteCustomers)


module.exports = router