const asyncHandler = require('express-async-handler')
const Course = require('../models/course')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const addCourse = asyncHandler(async(req,res) => {
    const {title,author,price,description,category,image,startDate,endDate} = await req.body
    if (!title || !author || !price || !description || !category || !image || !startDate || !endDate) {
        const data = {
            status: 400,
            message: 'Error: Please fill all fields'
        }
        res.status(400).send(data)
        return
    }

    const courseExists = await Course.findOne({title})
    if (courseExists){
        const data = {
            status: 400,
            message: 'Error: Course already exists'
        }
        res.status(400).send(data)
        return
    }

    const course = await Course.create({
        title,
        author,
        price,
        description,
        category,
        image,
        startDate,
        endDate
    })

    if (course){
        const data = {
            status: 200,
            _id: course._id,
        }
        res.status(200).json(data)
        return
    }
    else{
        const data = {
            status: 400,
            message: 'Error: Course not created'
        }
        res.status(400).send(data)
        return
    }
})

const updateCourse = asyncHandler(async(req,res) => {
    const {title,author,price,description,category,image,startDate,endDate} = await req.body
    if (!title || !author || !price || !description || !category || !image || !startDate || !endDate) {
        const data = {
            status: 400,
            message: 'Error: Please fill all fields'
        }
        res.status(400).send(data)
        return
    }

    const course = await Course.findOne({title})

    if (course){
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
        res.status(200).json(data)
        return
    }
    else{
        const data = {
            status: 400,
            message: 'Error: Course not updated'
        }
        res.status(400).send(data)
        return
    }
})

const deleteCourse = asyncHandler(async(req,res) => {
    const {title} = await req.body
    if (!title) {
        const data = {
            status: 400,
            message: 'Error: Please fill all fields'
        }
        res.status(400).send(data)
        return
    }
    const course = await Course.findOne({title})
    if (course){
        await course.deleteOne();
        const data = {
            status: 200,
            message: 'Course deleted'
        }
        res.status(200).json(data)
        return
    }
    else{
        const data = {
            status: 400,
            message: 'Error: Course not found'
        }
        res.status(400).send(data)
        return
    }
})

const getAllCourses = asyncHandler(async(req,res) => {
    const courses = await Course.find({})
    if (courses){
        const data = {
            status: 200,
            courses
        }
        res.status(200).json(data)
        return
    }
    else{
        const data = {
            status: 400,
            message: 'Error: Courses not found'
        }
        res.status(400).send(data)
        return
    }
})

const getCourse = asyncHandler(async(req,res) => {
    const title = await req.body.title
    if (!title) {
        const data = {
            status: 400,
            message: 'Error: Please fill all fields'
        }
        res.status(400).send(data)
        return
    }
    const course = await Course.findOne({title})
    if (course){
        const data = {
            status: 200,
            course
        }
        res.status(200).json(data)
        return
    }
    else{
        const data = {
            status: 400,
            message: 'Error: Course not found'
        }
        res.status(400).send(data)
        return
    }
})

module.exports = {addCourse, updateCourse, deleteCourse, getAllCourses, getCourse}