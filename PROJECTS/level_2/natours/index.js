const express = require('express');
const connectDB = require('./DB/db')
const tourRouter = require('./routes/tourRoutes')

const app = express();

app.use(express.json());
// Route level middleware
app.use('/api/v1/tours', tourRouter);




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`----------------------------------------`)
    console.log(`App running on PORT ${PORT}`)
    connectDB;
})