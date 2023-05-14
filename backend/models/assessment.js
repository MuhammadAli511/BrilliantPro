const mongoose = require('mongoose')

const assessmentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    course: {
        type: [String],
        required: true,
    },
    passingCriteria: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
    },
    numQuestions: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Assessment',assessmentSchema)