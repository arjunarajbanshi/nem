> # Env Variables

Environment variables are the standard way to store configuration in Node.js and Express, such as API keys, database URLs, and port numbers. They help keep secrets out of your source code.

## 1. Create a `.env` file

In your project root, create a file named `.env`:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/mydb
JWT_SECRET=my_super_secret_key
API_KEY=abc123xyz
```

## 2. Install `dotenv`

```bash
npm install dotenv
```

## 3. Load environment variables

At the very top of your entry file (`index.js`, `app.js`, or `server.js`):

```javascript
require("dotenv").config();
```

Or if you're using ES modules:

```javascript
import dotenv from "dotenv";

dotenv.config();
```

## 4. Access variables

Use `process.env`:

```javascript
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const jwtSecret = process.env.JWT_SECRET;

console.log(port);
```

## 5. Example Express app

```javascript
require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 6. Ignore `.env` in Git

Add it to your `.gitignore`:

```gitignore
node_modules/
.env
```

Never commit secrets like API keys or passwords to version control.

## 7. Use different environments (optional)

You can have files like:

```
.env
.env.development
.env.production
.env.test
```

For example:

```env
# .env.development
PORT=3000
```

```env
# .env.production
PORT=8080
```

Packages like `dotenv-flow` or deployment platforms can help manage multiple environment files.

## 8. Set environment variables without `.env`

### Linux/macOS

```bash
export PORT=4000
node index.js
```

Or for a single command:

```bash
PORT=4000 node index.js
```

### Windows Command Prompt

```cmd
set PORT=4000
node index.js
```

### Windows PowerShell

```powershell
$env:PORT=4000
node index.js
```

## 9. Validate required variables

It's good practice to check that required variables exist:

```javascript
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}
```

## Project structure

```
project/
│
├── .env
├── .gitignore
├── package.json
├── index.js
└── node_modules/
```

## Best practices

* Keep secrets in environment variables, not in your source code.
* Commit a `.env.example` file instead of `.env`:

```env
PORT=
DB_URL=
JWT_SECRET=
API_KEY=
```

* Use `process.env.VARIABLE_NAME` throughout your application.
* Add `.env` to `.gitignore`.
* Validate required environment variables when your application starts.

This approach works for both plain Node.js applications and Express applications.
