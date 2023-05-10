const express = require('express')
const router = express.Router()
const {signup, login, deleteStudent, updateStudent, getStudent} = require('../controllers/studentController')
const {requireAuth} = require('../middleware/auth')

// GET  api/studentRoute/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working (Student)")
})

// POST  api/studentRoute/signup/
router.post('/signup',signup)

// POST  api/studentRoute/login/
router.post('/login',login)

// DELETE  api/studentRoute/delete/
router.delete('/delete',deleteStudent)

// PUT  api/studentRoute/update/
router.put('/update',updateStudent)

// GET  api/studentRoute/get/
router.get('/get',getStudent)


module.exports = router