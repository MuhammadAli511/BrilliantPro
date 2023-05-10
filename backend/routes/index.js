const express = require('express')
const studentRoutes = require('./studentRoutes')
const courseRoutes = require('./courseRoutes')
const router = express.Router()


// GET  api/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working")
})

router.use('/studentRoute',studentRoutes)
router.use('/courseRoute',courseRoutes)

module.exports = router