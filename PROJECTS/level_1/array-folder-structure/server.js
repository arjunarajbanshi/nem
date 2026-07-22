// Simple CRUD using array methods in PROPER FOLDER STRUCTURE
const express = require('express');
const router = require("./routes/routes");
const { checkID } = require('./middleware/middleware');

const app = express();

// middleware
app.use(express.json());
// to serve static files use this built-in middleware. rotes becomes 
app.use(express.static(`${__dirname}/Assets`))  // http://127.0.0.1:3000/hello.html

// crating param middleware
router.param('id', (req, res, next, val) => {
    console.log(`Requested ID : ${val}, for ${req.method} request. From ${req.headers["user-agent"]}`)
    next();
})
router.param("id",checkID)

app.use((req, res, next) => {
    console.log("Application level middleware : I will run in every incoming request!");
    req.requestTime = new Date().toISOString();
    console.log(req.requestTime);
    console.log('-------------------')
    next()
})

app.use("/api/v1/", router)

// Envoroment variables
console.log(app.get('env'))
// console.log(process.env)  

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

/*
router.param() (or app.param()) only runs when the route contains that parameter.
SYNTAX
router.param("parameterName", (req, res, next, value) => {
    // value is the value of the route parameter
    next();
});
*/