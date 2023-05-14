const express = require('express')
const router = express.Router()
const { addAssessment, deleteAssessment, getCourseAssessment } = require('../controllers/assessmentController')

// GET  api/assessmentRoute/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working (Assessment)")
})

// POST  api/assessmentRoute/add/
router.post('/add',addAssessment)

// DELETE  api/assessmentRoute/delete/
router.delete('/delete',deleteAssessment)

// GET  api/assessmentRoute/getCourseAssessment/
router.get('/getCourseAssessment',getCourseAssessment)

module.exports = router