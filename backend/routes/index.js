const express = require('express')
const customerRoutes = require('./customerRoutes')
const cartRoutes = require('./cartRoutes')
const router = express.Router()


// GET  api/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working")
})

router.use('/customerRoute',customerRoutes)
router.use('/cartRoute',cartRoutes)

module.exports = router