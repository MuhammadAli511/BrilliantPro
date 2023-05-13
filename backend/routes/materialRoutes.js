const express = require('express')
const router = express.Router()
const { addMaterial } = require('../controllers/materialController')

// GET  api/materialRoute/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working (Material)")
})

// POST  api/materialRoute/add/
router.post('/add',addMaterial)

module.exports = router