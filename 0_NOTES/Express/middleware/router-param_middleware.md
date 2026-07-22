> # router.param() middleware

**Param middleware** runs **automatically whenever a specific route parameter is present**. It is commonly used to:

* Validate route parameters (e.g., ensure `id` is a number)
* Fetch data before the route handler
* Avoid repeating the same code in multiple routes

### Syntax

```javascript
router.param("parameterName", (req, res, next, value) => {
    // 4 params, value is the value of the route parameter
    next();
});
```

* `req` → Request object
* `res` → Response object
* `next()` → Passes control to the next middleware
* `value` → The parameter value (e.g., `:id`)

---

## Example 1: Log the ID

```javascript
const express = require("express");

const router = express.Router();

router.param("id", (req, res, next, id) => {
    console.log("ID:", id);
    next();
});

router.get("/items/:id", (req, res) => {
    res.send(`Item ID: ${req.params.id}`);
});

module.exports = router;
```

Request:

```http
GET /items/5
```

Console:

```text
ID: 5
```

Response:

```text
Item ID: 5
```

---

## Example 2: Validate the ID

```javascript
router.param("id", (req, res, next, id) => {
    if (isNaN(id)) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    next();
});
```

Request:

```http
GET /items/abc
```

Response:

```json
{
    "message": "Invalid ID"
}
```

---

## Example 3: Find the Item Once

Instead of repeating this in every controller:

```javascript
const item = items.find(item => item.id === Number(req.params.id));

if (!item) {
    return res.status(404).json({
        message: "Item not found"
    });
}
```

Use param middleware:

```javascript
const items = require("../data/items");

router.param("id", (req, res, next, id) => {
    const item = items.find(item => item.id === Number(id));

    if (!item) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    req.item = item;

    next();
});
```

Then your controllers become simpler:

```javascript
const getItem = (req, res) => {
    res.json(req.item);
};

const updateItem = (req, res) => {
    req.item.name = req.body.name;

    res.json({
        message: "Updated successfully",
        item: req.item
    });
};
```

---

## Execution Order

```javascript
router.param("id", (req, res, next, id) => {
    console.log("Param middleware");
    next();
});

router.get("/items/:id", (req, res) => {
    console.log("Route handler");
    res.send("Done");
});
```

Request:

```http
GET /items/10
```

Output:

```text
Param middleware
Route handler
```

The param middleware always runs **before** the matching route handler.

---

## When Does It Run?

It runs only for routes that include the specified parameter:

```javascript
router.param("id", paramMiddleware);

router.get("/items", getItems);        // ❌ Doesn't run
router.get("/items/:id", getItem);     // ✅ Runs
router.patch("/items/:id", updateItem); // ✅ Runs
router.delete("/items/:id", deleteItem); // ✅ Runs
```

---

## Common Use Cases

* Validate IDs (`:id`, `:userId`, `:productId`)
* Load a user, product, or item from a database
* Attach the loaded object to `req` (e.g., `req.user`, `req.item`)
* Avoid duplicating lookup logic across multiple route handlers

Using `router.param()` helps keep your controllers focused on handling requests while centralizing parameter validation and data loading.
