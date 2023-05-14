const express = require('express')
const router = express.Router()
const { addMaterial,  getAllMaterial, deleteMaterial, getMaterialCount } = require('../controllers/materialController')

// GET  api/materialRoute/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working (Material)")
})

// POST  api/materialRoute/add/
router.post('/add',addMaterial)

// GET api/materialRoute/getAll/
router.get('/getAll',getAllMaterial)

// DELETE api/materialRoute/delete/
router.delete('/delete',deleteMaterial)

// GET api/materialRoute/getMaterialCount/
router.get('/getMaterialCount',getMaterialCount)

module.exports = router