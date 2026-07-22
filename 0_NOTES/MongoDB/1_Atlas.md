Yes, that is **mostly true**, but it needs a small correction.

---

# MongoDB Atlas Setup (Step-by-Step)

## 1. Create an Atlas Account

Go to:

> [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)

Create an account and verify your email.

---

## 2. Create a Cluster

* Click **Create**
* Choose **Free (M0)**
* Select a cloud provider (AWS, Azure, or GCP)
* Choose the nearest region
* Click **Create Deployment**

Wait 1–3 minutes for the cluster to be created.

---

## 3. Create a Database User

Go to:

**Security → Database Access**

Click **Add New Database User**

Example:

```
Username: ar_user
Password: user_ar_lms
```

Grant:

```
Built-in Role

Read and Write to Any Database
```

(or choose a more restricted role if appropriate).

---

## 4. Allow Network Access

Go to:

**Security → Network Access**

Click:

```
Add IP Address
```

For development:

```
Allow Access From Anywhere

0.0.0.0/0
```

For production, whitelist only your server's IP.

---

## 5. Get Connection String

Click

```
Connect
```

↓

```
Drivers
```

↓

Copy the connection string.

Example:

```text
mongodb+srv://<username>:<password>@cluster0.jcjfzcn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Replace

```
<username>
<password>
```

with your credentials.

---

# Database Name

Suppose your URI is

```text
mongodb+srv://ar_user:user_ar_lms@cluster0.jcjfzcn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Notice there is **nothing after `.net/`**.

In this case,

```
No database is specified.
```

If you connect like this:

```js
await mongoose.connect(uri);
```

Mongoose/MongoDB will use the default database (`test`) **unless** you specify another database through the connection options.

Example:

```js
await mongoose.connect(uri, {
  dbName: "ar",
});
```

Now the database becomes

```
ar
```

---

## Specifying the Database in the URI

You can also specify it directly:

```text
mongodb+srv://ar_user:user_ar_lms@cluster0.jcjfzcn.mongodb.net/ar?retryWrites=true&w=majority&appName=Cluster0
```

Here,

```
Database = ar
```

So yes—

```text
mongodb.net/ar?...
```

means

```
Database name = ar
```

---

## So is your statement true?

Your original statement:

```text
Any name(db_name) before question mark (?) will be database name,
and won't take test by default.
```

✅ **Yes**, but it is more precise to say:

> Any path between `.mongodb.net/` and the `?` is treated as the default database for that connection.

Example:

```text
mongodb.net/shop?...
```

↓

Default database:

```
shop
```

Example:

```text
mongodb.net/lms?...
```

↓

Default database:

```
lms
```

If omitted:

```text
mongodb.net/?...
```

then **no database is specified in the URI**. The driver/Mongoose may use the `test` database by default **unless** you provide `dbName` in `mongoose.connect()`.

---

# Three Equivalent Ways

### 1. Database in URI ✅

```js
const uri =
  "mongodb+srv://user:pass@cluster.mongodb.net/lms?retryWrites=true&w=majority";

await mongoose.connect(uri);
```

Database:

```
lms
```

---

### 2. Database in `dbName` option ✅ (recommended)

```js
const uri =
  "mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority";

await mongoose.connect(uri, {
  dbName: "lms",
});
```

Database:

```
lms
```

---

### 3. No database specified ⚠️

```js
await mongoose.connect(uri);
```

May connect using the default `test` database if no database is otherwise specified.

---

## Recommended Practice

For Mongoose projects, many developers prefer keeping the URI independent of the database and specifying the database with `dbName`:

```js
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: "lms",
});
```

This makes it easy to switch databases across environments without changing the connection string itself.
