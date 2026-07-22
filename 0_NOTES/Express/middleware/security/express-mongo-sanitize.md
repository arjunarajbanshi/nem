> # Express Mongo Sanitize

```bash
npm i express-mongo-sanitize # Data sanitizer for mongo
```

```js
// index.js
const mongoSanitize = require('express-mongo-sanitize');

// put this after express.json() body parser as first data comes then this middleware sanitized those data
app.use(mongoSanitize()) // protects against NoSQL query injection

```