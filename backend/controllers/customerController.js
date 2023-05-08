const asyncHandler = require('express-async-handler')
const Customer = require('../models/customer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(email){
    const token =  jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '30d'})
    return token
}

const signup = asyncHandler(async(req,res) => {
    const {firstName,lastName,email,password} = await req.body
    if (!firstName || !lastName || !email || !password ) {
        const data = {
            status: 400,
            message: 'Error: Please fill all fields'
        }
        res.status(400).send(data)
        return
    }

    const customerExists = await Customer.findOne({email})
    if (customerExists){
        const data = {
            status: 400,
            message: 'Error: Customer already exists'
        }
        res.status(400).send(data)
        return
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const customer = await Customer.create({
        firstName,
        lastName,
        email,
        password:hashedPassword
    })

    if (customer){
        const data = {
            status: 200,
            _id: customer._id,
        }
        res.status(200).json(data)
        return
    }
    else{
        const data = {
            status: 400,
            message: 'Error: Customer not created'
        }
        res.status(400).send(data)
        return
    }
})

const login = asyncHandler(async(req,res) => {
    const {email,password} = await req.body
    if (!email || !password) {
        const data = {
            status: 400,
            message: 'Error: Please provide an email and password'
        }
        res.status(400).send(data)
        return
    }

    const customer = await Customer.findOne({email})
    if (!customer){
        const data = {
            status: 401,
            message: 'Error: Invalid email or password'
        }
        res.status(401).send(data)
        return
    }

    const passwordMatch = await bcrypt.compare(password, customer.password)
    if (!passwordMatch){
        const data = {
            status: 401,
            message: 'Error: Invalid email or password'
        }
        res.status(401).send(data)
        return
    }

    const data = {
        status: 200,
        _id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        token: generateToken(customer.email)
    }
    res.status(200).json(data)
})

const getAllCustomers = asyncHandler(async(req,res) => {
    const customers = await Customer.find({})
    const data = {
        status: 200,
        customers:  customers
    }
    res.status(200).json(data)
})

const getSingleCustomer = asyncHandler(async(req,res) => {
    const customer = await Customer.findOne({email: req.params.email})
    if (!customer){
        const data = {
            status: 404,
            message: 'Error: Customer not found'
        }
        res.status(404).send(data)
        return
    }
    const data = {
        status: 200,
        customer: customer
    }
    res.status(200).json(data)
})

const getLimitCustomers = asyncHandler(async(req,res) => {
    const customers = await Customer.find({}).limit(req.params.limit)
    const data = {
        status: 200,
        customers:  customers
    }
    res.status(200).json(data)
})

const sortCustomers = asyncHandler(async(req,res) => {
    const customers = await Customer.find({}).sort(req.params.sort)
    const data = {
        status: 200,
        customers:  customers
    }
    res.status(200).json(data)
})

const updateCustomers = asyncHandler(async(req,res) => {
    const customer = await Customer.findOneAndUpdate({email: req.params.email}, req.body, {new: true})
    if (!customer){
        const data = {
            status: 404,
            message: 'Error: Customer not found'
        }
        res.status(404).send(data)
        return
    }
    const data = {
        status: 200,
        customer: customer
    }
    res.status(200).json(data)
})

const deleteCustomers = asyncHandler(async(req,res) => {
    const customer = await Customer.findOneAndDelete({email: req.params.email})
    if (!customer){
        const data = {
            status: 404,
            message: 'Error: Customer not found'
        }
        res.status(404).send(data)
        return
    }
    const data = {
        status: 200,
        customer: customer
    }
    res.status(200).json(data)
})

module.exports = {
    signup,
    login,
    getAllCustomers,
    getSingleCustomer,
    getLimitCustomers,
    sortCustomers,
    updateCustomers,
    deleteCustomers
}