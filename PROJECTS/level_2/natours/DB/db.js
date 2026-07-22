const mongoose = require('mongoose');

const connectDB = mongoose.connect('mongodb://127.0.0.1:27017/natours').then(() => {
    console.log('Connected to database')
    console.log(`----------------------------------------`)
}).catch(() => console.log('Error connecting to database'))

module.exports = connectDB