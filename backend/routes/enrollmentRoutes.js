const express = require('express')
const router = express.Router()
const { addEnrollment,deleteEnrollment,getAllEnrollments,getCourseEnrollments   } = require('../controllers/enrollmentsController')

// GET  api/menrollmentRoute/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working (Enrollment)")
})

// POST  api/enrollmentRoute/add/
router.post('/add',addEnrollment)

// DELETE api/enrollmentRoute/delete/
router.delete('/delete',deleteEnrollment)

// GET api/enrollmentRoute/getAll/
router.get('/getAll',getAllEnrollments)

// POST api/enrollmentRoute/getCourseEnrollments/
router.post('/getCourseEnrollments',getCourseEnrollments)

module.exports = router