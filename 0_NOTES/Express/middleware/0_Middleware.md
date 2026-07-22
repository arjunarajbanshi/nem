> # Midleware 

- Provides a way to add and reuse common funtionality across in application's routes and endpoints.

- Executes during the request-response cycle.

- `Can modify request and response object.`

- Can end the request-response cycle.

- Can call the next middleware in the stack.

- Can be application-level, router-level, or route-specific.

## Syntax
```js
/* Middleware is use to edit the request or response objects, or terminate the request before it reaches the route handler code. */

/* Standard way */
(req, res, next) => { 
	// middleware logic
	next() //
}

/* This also works */
(a,b,whatever)=> {
	// middleware logic
	whatever()
}
/* if 3 parameters and calling that paramter like funtion,
	express recognizes it as middleware. */

// To use built-in middleware
// app.use(middleware)
express.json() - 

```


> ## Application-level middleware
_It is bound to the Express application instance using `app.use()` or `app.METHOD()` functions._

- _Execute for absolutely every incoming request to your server—regardless of whether it's a GET, POST, or PATCH, and no matter the URL._

```js
/*
Basic middleare pattern/structure

Simple : 3 parameter and calling last parameter as a funtion(), express
	recognizes it as a middleware.
*/
app.use((req, res, next) => {
  // Middleware code goes here
  console.log('Time:', Date.now());
  
  // Call next() to pass control to the next middleware in the stack
  next();
});
/*
- When you call next(), the next middleware in the stack is executed.
- If you don't call next(), the request-response cycle ends and no further middleware runs.
*/
```

## Router-level Middleare 
_It is bound to an instance of `express.Router()`_

```js
const express = require('express');
const router = express.Router();

// Router-level middleware
router.use((req, res, next) => {
  console.log('Router specific middleware');
  next();
});

router.get('/user/:id', (req, res) => {
  res.send('User profile');
});

// Add the router to the app
app.use('/api', router);
```


## Error-handling Middleware

```js
/*
Error-handling middleware is defined with four arguments (err, req, res, next)
and is used to handle errors that occur during request processing.

Key points :
- Must have exactly four parameters
- Should be defined after other app.use() and route calls
- Can be used to centralize error handling logic
- Can forward errors to the next error handler using next(err)
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})
```

## Built-in Middleware

* **`express.json()`** – Parses incoming JSON request bodies and makes the data available in `req.body`.

* **`express.urlencoded()`** – Parses URL-encoded form data submitted through HTML forms.

* **`express.static()`** – Serves static files like HTML, CSS, JavaScript, and images from a directory.

* **`express.Router()`** – Creates modular, reusable route handlers to organize application routes.

## Third-Party Middleware

* **`Helmet`** – Adds security-related HTTP headers to help protect your Express app.

* **`Morgan`** – Logs HTTP requests to the console for debugging and monitoring.

* **`CORS`** – Enables Cross-Origin Resource Sharing, allowing requests from different origins.

* **`Compression`** – Compresses HTTP responses to improve performance and reduce bandwidth usage.

* **`Cookie-parser`** – Parses cookies from incoming requests and makes them available in `req.cookies`.
