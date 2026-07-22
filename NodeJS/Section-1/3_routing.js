const http = require("http");

server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.end("You are connected to SERVER!")
    }
    else if (req.url === "/dashboard") {
        res.end("Welcome to DASHBOARD")
    }
    else {
        // always send/set header or status before sending response
        res.writeHead(404, {
            'content-type': 'text/html',
            // 'my-own-header': 'my-custom-header'
        })
        res.end("<h1>Page not found!</h1>")
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening on port 8000...")
})
