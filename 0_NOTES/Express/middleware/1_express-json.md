> # express.json()

```js
// express.json() - To handle JSON data

import express from "express";
const app = express();

// Using built-in middleware
server.use(express.json()); /* Express doesn't automatically understand JSON in
the request body. expres.json() parses incoming JSON(via POST or PUT request) into
Javascript Object */

server.post('/users', (req, res) => {
    // Because of the middleware, we can access the data here
    const user = req.body; 
    res.send("User created successfully.");
});

server.listen(3000);
/*
What express.json() does :
- Intercepts the incoming request before it reaches route handlers
- Parse raw data of the request if content-Type header is application/json
- Attaches that parsed data to the req.body object.
*/
```