const express = require('express')
const studentRoutes = require('./studentRoutes')
const courseRoutes = require('./courseRoutes')
const adminRoutes = require('./adminRoutes')
const materialRoutes = require('./materialRoutes')
const enrollmentRoutes = require('./enrollmentRoutes')
const router = express.Router()


// GET  api/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working")
})

router.use('/studentRoute',studentRoutes)
router.use('/courseRoute',courseRoutes)
router.use('/adminRoute',adminRoutes)
router.use('/materialRoute',materialRoutes)
router.use('/enrollmentRoute',enrollmentRoutes)

module.exports = router