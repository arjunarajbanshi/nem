const fs = require("fs");
const http = require("http");

// read json file
// const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const data = fs.readFileSync('../data/data.json', 'utf-8');
// convert json into object
const productData = JSON.parse(data);


server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("You are connected to NODE JS SERVER!");
    }
    else if (req.url === "/api") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(data)
    }
    else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.end("<h1>Page not found!</h1>")
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening on port 8000...")
})

/*
IMPORTANT : __dirname is only available in CommonJS (require)

__dirname is a built-in global-like variable that provides the absolute path to the directory containing the currently executing JavaScript file.

__dirname: The absolute path to the directory (excluding the filename).

__filename: The absolute path to the current file (including the filename).

Example : If your project is located at /Users/admin/project/index.js:
console.log(__dirname); 
// Output: /Users/admin/project

console.log(__filename); 
// Output: /Users/admin/project/index.js
*/
