const asyncHandler = require('express-async-handler')
const Course = require('../models/course')
const Material = require('../models/material')
const Audit = require('../models/audit')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const multer = require("multer");


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

const addCourse = asyncHandler(async (req, res) => {

    const auditEmail = req.header("email");
    const {
        title,
        author,
        price,
        description,
        category,
        image,
        startDate,
        endDate,
        material,
        materialName,
        materialType
    } = req.body;

    if (!title || !author || !price || !description || !category || !image || !startDate || !endDate || !material || !materialName || !materialType) {
        res.status(400).json({
            status: 400,
            message: "Please fill all fields"
        });
        return;
    }

    

    const courseExists = await Course.findOne({ title });
    if (courseExists) {
        res.status(400).json({
            status: 400,
            message: "Course already exists"
        });
        return;
    }

    const course = await Course.create({
        title,
        author,
        price,
        description,
        image,
        category,
        startDate,
        endDate
    });

    const materialObj = await Material.create({
        materialName,
        materialType,
        material,
        courseTitles: [title]
    })


    if (course && materialObj) {
        auditAdd(auditEmail, "Course", "Add", title);
        res.status(200).json({
            status: 200,
            _id: course._id
        });
        return;
    } else {
        res.status(400).json({
            status: 400,
            message: "Course not created"
        });
        return;
    }
});

const updateCourse = asyncHandler(async (req, res) => {
    const auditEmail = req.header('email');
    const { title, author, price, description, category, image, startDate, endDate } = await req.body
    if (!title || !author || !price || !description || !category || !image || !startDate || !endDate) {
        const data = {
            status: 400,
            message: 'Error: Please fill all fields'
        }
        res.status(400).send(data)
        return
    }

    const course = await Course.findOne({ title })

    if (course) {
        course.title = title
        course.author = author
        course.price = price
        course.description = description
        course.category = category
        course.image = image
        course.startDate = startDate
        course.endDate = endDate

        const updatedCourse = await course.save()
        const data = {
            status: 200,
            _id: updatedCourse._id,
        }
        auditAdd(auditEmail, 'Course', 'Update', title);
        res.status(200).json(data)
        return
    }
    else {
        const data = {
            status: 400,
            message: 'Error: Course not updated'
        }
        res.status(400).send(data)
        return
    }
})

const deleteCourse = asyncHandler(async (req, res) => {
    const auditEmail = req.header('email');
    const { title } = await req.body
    if (!title) {
        const data = {
            status: 400,
            message: 'Error: Please fill all fields'
        }
        res.status(400).send(data)
        return
    }
    const course = await Course.findOne({ title })
    if (course) {
        await course.deleteOne();
        const data = {
            status: 200,
            message: 'Course deleted'
        }
        auditAdd(auditEmail, 'Course', 'Delete', title);
        res.status(200).json(data)
        return
    }
    else {
        const data = {
            status: 400,
            message: 'Error: Course not found'
        }
        res.status(400).send(data)
        return
    }
})

const getAllCourses = asyncHandler(async (req, res) => {
    const auditEmail = req.header('email');
    const courses = await Course.find({})
    if (courses) {
        const data = {
            status: 200,
            courses
        }
        auditAdd(auditEmail, 'Course', 'Get', 'All')
        res.status(200).json(data)
        return
    }
    else {
        const data = {
            status: 400,
            message: 'Error: Courses not found'
        }
        res.status(400).send(data)
        return
    }
})

const getCourse = asyncHandler(async (req, res) => {
    const auditEmail = req.header('email');
    const title = await req.body.title
    if (!title) {
        const data = {
            status: 400,
            message: 'Error: Please fill all fields'
        }
        res.status(400).send(data)
        return
    }
    const course = await Course.findOne({ title })
    if (course) {
        const data = {
            status: 200,
            course
        }
        auditAdd(auditEmail, 'Course', 'Get', title);
        res.status(200).json(data)
        return
    }
    else {
        const data = {
            status: 400,
            message: 'Error: Course not found'
        }
        res.status(400).send(data)
        return
    }
})

module.exports = { addCourse, updateCourse, deleteCourse, getAllCourses, getCourse }