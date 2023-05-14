const asyncHandler = require('express-async-handler')
const Enrollments = require('../models/enrollments')
const Student = require('../models/student')
const Course = require('../models/course')
require('dotenv').config()

const addEnrollment = asyncHandler(async (req, res) => {
        const {
            studentEmail,
            courseTitle
        } = req.body;
    
        if (!studentEmail || !courseTitle) {
            res.status(400).json({
                status: 400,
                message: "Please fill all fields"
            });
            return;
        }
        // check if student email exists
        const student = await Student.findOne({
            email: studentEmail
        })
        
        if (!student) {
            res.status(400).json({
                status: 400,
                message: "Student not found"
            });
            return;
        }

        // check if course title exists
        const course = await Course.findOne({
            title: courseTitle
        })

        if (!course) {
            res.status(400).json({
                status: 400,
                message: "Course not found"
            });
            return;
        }
        const enrollment = await Enrollments.create({
            studentEmail,
            courseTitle
        })
    
        if (enrollment) {
            res.status(200).json({
                status: 200,
                message: "Enrollment added successfully"
            });
            return;
        } else {
            res.status(400).json({
                status: 400,
                message: "Enrollment not added"
            });
            return;
        }
    }
)

const deleteEnrollment = asyncHandler(async (req, res) => {
    const {
        studentEmail,
        courseTitle
    } = req.body;
    if (!studentEmail || !courseTitle) {
        res.status(400).json({
            status: 400,
            message: "Please fill all fields"
        });
        return;
    }
    const enrollment = await Enrollments.findOne({
        studentEmail,
        courseTitle
    })
    if (enrollment) {
        await enrollment.deleteOne();
        res.status(200).json({
            status: 200,
            message: "Enrollment deleted"
        });
        return;
    }
    else {
        res.status(400).json({
        status: 400,
        message: "Enrollment not found"
    });
    return;
    }
})

const getAllEnrollments = asyncHandler(async (req, res) => {
    const enrollments = await Enrollments.aggregate([
        {
            $group: {
                _id: "$studentEmail",
                courses: {
                    $push: "$courseTitle"
                }
            }
        }
    ])
    if (enrollments) {
        res.status(200).json({
            status: 200,
            enrollments
        });
        return;
    }
})

const getCourseEnrollments = asyncHandler(async (req, res) => {
    const {
        courseTitle
    } = req.body;
    if (!courseTitle) {
        res.status(400).json({
            status: 400,
            message: "Please fill all fields"
        });
        return;
    }
    const enrollments = await Enrollments.find({
        courseTitle
    })
    if (enrollments) {
        res.status(200).json({
            status: 200,
            enrollments
        });
        return;
    }
})

module.exports = {
    addEnrollment,
    deleteEnrollment,
    getAllEnrollments,
    getCourseEnrollments
}