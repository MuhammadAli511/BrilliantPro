const asyncHandler = require('express-async-handler')
const Student = require('../models/student')
const Audit = require('../models/audit')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(email){
    const token =  jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '30d'})
    return token
}

async function auditAdd(auditEmail, tableName, operationType, entityChanged){
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth()+1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const date = dd+'-'+mm+'-'+yyyy;

    const time = today.toLocaleTimeString('en-US', { hour12: true,
        hour: "numeric", minute: "numeric", second: "numeric"});


    const audit = await Audit.create({
        userEmail: auditEmail,
        changeDate: date,
        changeTime: time,
        tableName: tableName,
        operationType: operationType,
        entityChanged: entityChanged
    })
    if (audit){
        return true
    } else {
        return false
    }
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

    const studentExists = await Student.findOne({email})
    if (studentExists){
        const data = {
            status: 400,
            message: 'Error: Student already exists'
        }
        res.status(400).send(data)
        return
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const student = await Student.create({
        firstName,
        lastName,
        email,
        password:hashedPassword
    })

    if (student){
        const data = {
            status: 200,
            _id: student._id,
        }
        res.status(200).json(data)
        return
    }
    else{
        const data = {
            status: 400,
            message: 'Error: Student not created'
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

    const student = await Student.findOne({email})
    if (!student){
        const data = {
            status: 401,
            message: 'Error: Invalid email or password'
        }
        res.status(401).send(data)
        return
    }

    const passwordMatch = await bcrypt.compare(password, student.password)
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
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        token: generateToken(student.email)
    }
    res.status(200).json(data)
})

const deleteStudent = asyncHandler(async(req,res) => {
    const auditEmail = req.header('email');
    const {email} = await req.body;
    
    if (!email) {
        const data = {
            status: 400,
            message: 'Error: Please provide an email'
        }
        res.status(400).send(data)
        return
    }
    const student = await Student.findOne({email})
    if (!student){
        const data = {
            status: 401,
            message: 'Error: Invalid email'
        }
        res.status(401).send(data)
        return
    }
    const deletedStudent = await Student.deleteOne({email})
    if (deletedStudent){
        const data = {
            status: 200,
            message: 'Student deleted'
        }
        auditAdd(auditEmail, 'Student', 'DELETE', email)
        res.status(200).json(data)
        return
    }
    else{
        const data = {
            status: 400,
            message: 'Error: Student not deleted'
        }
        res.status(400).send(data)
        return
    }
})

const updateStudent = asyncHandler(async(req,res) => {
    const auditEmail = req.header('email');
    const {email,firstName,lastName, password} = await req.body
    if (!email) {
        const data = {
            status: 400,
            message: 'Error: Please provide an email'
        }
        res.status(400).send(data)
        return
    }
    const student = await Student.findOne({email})
    if (!student){
        const data = {
            status: 401,
            message: 'Error: Invalid email'
        }
        res.status(401).send(data)
        return
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const updatedStudent = await Student.updateOne({email},{
        firstName,
        lastName,
        password:hashedPassword
    })
    if (updatedStudent){
        const data = {
            status: 200,
            message: 'Student updated'
        }
        auditAdd(auditEmail, 'Student', 'UPDATE', email)
        res.status(200).json(data)
        return
    }
    else{
        const data = {
            status: 400,
            message: 'Error: Student not updated'
        }
        res.status(400).send(data)
        return
    }
})

const getStudent = asyncHandler(async(req,res) => {
    const auditEmail = req.header('email');
    const students = await Student.find({})
    if (students){
        const data = {
            status: 200,
            students
        }
        auditAdd(auditEmail, 'Student', 'GET', 'All')
        res.status(200).json(data)
        return
    }
    else{
        const data = {
            status: 400,
            message: 'Error: Students not found'
        }
        res.status(400).send(data)
        return
    }
})

module.exports = {
    signup,
    login,
    deleteStudent,
    updateStudent,
    getStudent
}