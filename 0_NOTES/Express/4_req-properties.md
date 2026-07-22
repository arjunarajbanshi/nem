> # Common Express.js `req` Properties

## `req.body`

Contains the request payload sent with **POST**, **PUT**, or **PATCH** requests.

* Available only when using `express.json()` or `express.urlencoded()` middleware.
* Typically used to access form data or JSON payloads.

**Example**

```js
const { field1, field2 } = req.body;
```

---

## `req.params`

Contains route parameters defined using `:` in the route. All values are returned as **strings**.

**Route**

```js
/app/api/v1/courses/:id
```

**Request URL**

```
/api/v1/courses/12431d34
```

**Example**

```js
const { id } = req.params;
```

---

## `req.query`

Contains query string parameters from the URL. All values are returned as **strings**.

**Request URL**

```
/courses?page=2&limit=10
```

**Example**

```js
const { page, limit } = req.query;

// req.query
// { page: "2", limit: "10" }
```

**Common use cases**

* Filtering
* Sorting
* Pagination

---

## `req.headers`

Contains all HTTP request headers as an object with **lowercase** keys.

**Example**

```js
const token = req.headers["authorization"];
```

**Common use cases**

* Authentication
* API key validation
* Content-Type detection

---

## `req.method`

Returns the HTTP method used for the request (e.g., `GET`, `POST`, `PUT`, `DELETE`).

**Example**

```js
if (req.method === "POST") {
  // Handle POST request
}
```

**Common use case**

* Conditional request handling in middleware

---

## `req.url`

Contains the request URL after Express route processing.

**Common use cases**

* Routing
* Debugging

---

## `req.originalUrl`

Contains the original request URL, including the query string.

**Example**

```
/courses?page=2
```

**Common use cases**

* Logging
* Debugging
* Request tracking

---

## `req.cookies`

Contains cookies sent by the client as an object.

* Requires the `cookie-parser` middleware.

**Common use cases**

* Session management
* Authentication tokens
* User preferences

---

## `req.signedCookies`

Contains signed cookies as an object.

* Requires the `cookie-parser` middleware with a secret.

**Common use cases**

* Secure session handling
* Signed authentication tokens

---

## `req.protocol`

Returns the request protocol (`http` or `https`).

**Example**

```js
req.protocol; // "https"
```

**Common use case**

* Redirecting insecure HTTP requests to HTTPS

---

## `req.ip`

Returns the client's IP address.

**Common use cases**

* Rate limiting
* Logging
* Security monitoring

---

## `req.path`

Returns only the pathname portion of the URL (excluding the query string).

**Example**

```
Request URL: /courses?page=2

req.path
// "/courses"
```

**Common use cases**

* Route matching
* Logging

---

## `req.hostname`

Returns the hostname from the incoming request.

**Example**

```
https://api.example.com/users

req.hostname
// "api.example.com"
```

**Common use cases**

* Multi-domain applications
* Tenant-based routing
* Host validation
