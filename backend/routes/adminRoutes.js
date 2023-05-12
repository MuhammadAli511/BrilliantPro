const express = require('express')
const router = express.Router()
const { login } = require('../controllers/adminController')

// GET  api/adminRoute/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working (Admin)")
})

// POST  api/adminRoute/login/
router.post('/login',login)

module.exports = router