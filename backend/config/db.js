const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/veevex', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected at ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDB