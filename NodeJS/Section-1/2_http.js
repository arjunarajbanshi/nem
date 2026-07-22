/* http : built-in module that enables you to create HTTP servers and make HTTP requests */
const http = require("http");

server = http.createServer((req, res) => {
    res.end("Hello from http server!")
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening on port 8000...")
})

/*
http.createServer() - Creates a new HTTP server instance

The callback function is executed for each request with two parameters:
    req - The request object (http.IncomingMessage)
    res - The response object (http.ServerResponse)

res.end() - Sends the response and ends the connection

server.listen() - Starts the server on the specified port
*/