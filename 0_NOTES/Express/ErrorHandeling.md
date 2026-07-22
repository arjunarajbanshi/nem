> # Error Handeling

## Following errors can occur

- **Operational Error** : Invalid path accessed, Invalid user input, request timeout, Failed to connect to server or database etc

- **Programming Error** : Reading properties on undefined, passing a number when object is expected, using await without async etc

> _It is best not to reveal actual error to client. We can just send them status code and custom message. We can also show errors according to env variables like if it is development show detailed kind of error and if it is production then show less informative error to client like 'something went wrong!','Internal server error!'._

## Middleware that catches any unmatched routes

```js
/* app.all() for all http verbs : get, post, patch, put, delete */

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Cann't find ${req.originalUrl} on this server!`,
  });
});
// Remember : This middleware have to be at last in middleware stack otherwise it will show the same res for all routes(if given in top of the middleware stack)
```

## Global Error Handeling Middleware

- It is done by creating a special middleware that catches errors from your routes and middleware in one place.

- _The error-handling middleware must have `4 parameters: err(error object), req, res, next`_

- _`The error handler should be the last middleware.`_



## 1. Create a Global Error Handler

The error-handling middleware must have **4 parameters**:

```javascript
// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
```

---

## 2. Register It Last

The error handler should be the **last middleware**.

```javascript
const express = require("express");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(3000);
```

---

## 3. Throw Errors in Routes

### Synchronous Example

```javascript
app.get("/", (req, res) => {
  throw new Error("Something went wrong");
});
```

Express catches synchronous errors automatically.

---

### Asynchronous Example (Express 5)

```javascript
app.get("/users", async (req, res) => {
  throw new Error("Database error");
});
```

Express 5 automatically forwards async errors to the global error handler.

---

### Asynchronous Example (Express 4)

In Express 4, wrap async code in `try...catch` and call `next(err)`:

```javascript
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
```

Or use an async wrapper:

```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

Usage:

```javascript
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  })
);
```

---

## 4. Custom Error Class

Create a reusable error class.

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
```

Use it like this:

```javascript
app.get("/profile", (req, res, next) => {
  return next(new AppError("User not found", 404));
});
```

---

## 5. Improved Global Error Handler

```javascript
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
```

---

## 6. Handle 404 Routes

Add this before the global error handler:

```javascript
app.use((req, res, next) => {
  const err = new Error("Route Not Found");
  err.statusCode = 404;
  next(err);
});
```

---

## Complete Flow

```javascript
app.use(express.json());

app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res, next) => {
  const err = new Error("Route Not Found");
  err.statusCode = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
```

### Request flow

```
Request
   │
   ▼
Route/Middleware
   │
   ├── Success ──► Response
   │
   └── Error (throw / next(err))
                │
                ▼
      Global Error Handler
                │
                ▼
         JSON Error Response
```

### Best practices

* Register the global error handler **after all routes**.
* Use `next(err)` to forward errors (required for async code in Express 4).
* Create a custom error class (such as `AppError`) for consistent status codes and messages.
* Don't expose stack traces or sensitive error details in production.
* Handle unknown routes with a 404 middleware before the global error handler.
