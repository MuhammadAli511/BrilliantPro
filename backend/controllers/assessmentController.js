const asyncHandler = require('express-async-handler')
const Assessment = require('../models/assessment')
const Course = require('../models/course')
const Audit = require('../models/audit')
require('dotenv').config()


async function auditAdd(auditEmail, tableName, operationType, entityChanged) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const date = dd + '-' + mm + '-' + yyyy;

    const time = today.toLocaleTimeString('en-US', {
        hour12: true,
        hour: "numeric", minute: "numeric", second: "numeric"
    });


    const audit = await Audit.create({
        userEmail: auditEmail,
        changeDate: date,
        changeTime: time,
        tableName: tableName,
        operationType: operationType,
        entityChanged: entityChanged
    })
    if (audit) {
        return true
    } else {
        return false
    }
}

const addAssessment = asyncHandler(async (req, res) => {
    const auditEmail = req.header('email');
    const {
        title,
        duration,
        course,
        passingCriteria,
        numQuestions,
        questions

    } = req.body;
    
    // check if title exists in course
    const assessmentExists = await Assessment.findOne({
        title,
        course
    })
    if (assessmentExists) {
        res.status(400)
        throw new Error('Assessment already exists')
    }
        

    const courseExists = await Course.findOne({
        title: course
    })
    if (!courseExists) {
        res.status(400)
        throw new Error('Course does not exist')
    }
    const assessment = await Assessment.create({
        title,
        duration,
        course,
        passingCriteria,
        numQuestions,
        questions
    })

    if (assessment) {
        const audit = await auditAdd(auditEmail, 'Assessment', 'Add', assessment)
        const data = {
            status: 200,
            message: 'Assessment added successfully'
        }
        if (audit) {
            res.status(200).json(data)
        }
    }
    else {
        res.status(400)
        throw new Error('Error occured while adding assessment')
    }
})

const deleteAssessment = asyncHandler(async (req, res) => {
    const {
        title,
        course
    } = req.body;

    const assessment = await Assessment.findOneAndDelete({
        title,
        course
    })
    if (assessment) {
        const audit = await auditAdd(req.user.email, 'Assessment', 'Delete', assessment)
        if (audit) {
            res.status(201).json(assessment)
        }
        else {
            res.status(400)
            throw new Error('Error occured while deleting assessment')
        }
    }
    else {
        res.status(400)
        throw new Error('Error occured while deleting assessment')
    }
})

const getCourseAssessment = asyncHandler(async (req, res) => {
    const {
        course
    } = req.body;

    const assessment = await Assessment.find({
        course
    })
    if (assessment) {
        const audit = await auditAdd(req.user.email, 'Assessment', 'Get', assessment)
        if (audit) {
            res.status(201).json(assessment)
        }
        else {
            res.status(400)
            throw new Error('Error occured while fetching assessment')
        }
    }
    else {
        res.status(400)
        throw new Error('Error occured while fetching assessment')
    }
})

module.exports = {
    addAssessment,
    deleteAssessment,
    getCourseAssessment
}