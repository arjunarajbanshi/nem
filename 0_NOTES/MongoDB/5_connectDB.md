> # Connect MongoDB using mongoose
- Mongoose is an object data modeling(ODM) library for mongoDB and Nodejs, a higher level of abstraction.

- Mongoose allows rapid and simple development of mongodb database interactions.

```env
NODE_ENV=development
PORT=3000
DATABASE_LOCAL=mongodb://127.0.0.1:27017/my-database-name
```

```bash
npm i mongoose # Install mongoDB driver
```

## SYNTAX

```js
/*
Connect to MongoDB using Mongoose.

Syntax:
mongoose.connect(uri, options)

Common options:
- dbName
- autoIndex
- bufferCommands
*/

// Recommended
mongoose.connect("mongodb://127.0.0.1:27017", {
  dbName: "my_database",
});

// Alternative
mongoose.connect("mongodb://127.0.0.1:27017/my_database");
```

> **Tip:** `127.0.0.1` is generally preferred over `localhost` because it avoids IPv6/DNS resolution issues on some systems.


## Database Connection

```js
import mongoose from "mongoose";

const connectionString = "mongodb://127.0.0.1:27017";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(connectionString, {
      dbName: "my_database",
    });

    console.log("Connected to MongoDB");

    return connection;
  } catch (err) {
    console.error("Connection failed:", err);
  }
};

dbConnect();
```