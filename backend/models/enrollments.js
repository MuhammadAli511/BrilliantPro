const mongoose = require('mongoose')

const enrollmentsSchema = mongoose.Schema({
    studentEmail: {
        type: String,
        required: true,
    },
    courseTitle: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Enrollments',enrollmentsSchema)