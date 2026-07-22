> # Document Middleware

In **Mongoose**, **document middleware** (also called **document hooks**) are middleware functions that execute on individual document instances before or after certain document operations. They let you run custom logic such as validation, hashing passwords, or updating timestamps.

 `4 types` : document, query, aggregation and model
    - `document` - runs before save() and create() command not on inertMany()
    - 

### Common document middleware

* `save`
* `validate`
* `updateOne` (when configured as document middleware)
* `deleteOne` (when configured as document middleware)
* `init` (runs when a document is initialized from the database)

### Syntax

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Pre middleware, this = represent the doc that is being processed
userSchema.pre('save', function (next) {
  console.log('Before saving:', this.name);
  next(); // next is same as expres middleware
});

// Post middleware, doc = final doc that is after processing
userSchema.post('save', function (doc) {
  console.log('After saving:', doc.name);
});

const User = mongoose.model('User', userSchema);
```

### Example

```javascript
const user = new User({
  name: "Alice",
  email: "alice@example.com"
});

await user.save();
```

**Output:**

```
Before saving: Alice
After saving: Alice
```

### `this` in document middleware

In document middleware, `this` refers to the **document being processed**.

```javascript
userSchema.pre('save', function (next) {
  console.log(this.email); // Access the document's email
  next();
});
```

### `updateOne` as document middleware

By default, `updateOne` is **query middleware**. To make it document middleware:

```javascript
userSchema.pre(
  'updateOne',
  { document: true, query: false },
  function (next) {
    console.log(this.name); // `this` is the document
    next();
  }
);

const user = await User.findById(id);
await user.updateOne({ name: "Bob" });
```

### Common use case: Hashing passwords

```javascript
const bcrypt = require('bcrypt');

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

This hashes the password before it is saved to the database.

### Document middleware vs. query middleware

| Feature                         | Document Middleware | Query Middleware                 |
| ------------------------------- | ------------------- | -------------------------------- |
| Runs on                         | Document instances  | Queries                          |
| `this` refers to                | Document            | Query object                     |
| Example                         | `doc.save()`        | `Model.updateOne()`              |
| Access document fields directly | ✅ Yes               | ❌ No (unless you query for them) |

**Example:**

```javascript
// Document middleware
await user.save();

// Query middleware
await User.updateOne({ _id: id }, { name: "Bob" });
```

In summary, **document middleware** runs on individual Mongoose document instances (such as when calling `save()` on a document), while **query middleware** runs on query operations (such as `Model.find()` or `Model.updateOne()`).

-----------------------
> video example
-----------------------
## Document Middleware
using pre `document midddleware` to create a slug from name using slugify package
```js
MySchema.pre('save',function(next)) {
    this.slug = slugify(this.name, {lowercase : true}) // creating slug from name and in lowercase
    next()
    // slug and name are property that is defined in schema or model
}
```

```js
MySchema.post('save',function(next)) {
    
    next()
}
```

## Query Middleware 

```js
MySchema.pre('find',function(next)) {
    
    next()
}
```

```js
MySchema.post('find',function(next)) {
    
    next()
}
```

## Aggregation Middleware

```js
MySchema.pre('aggregate',function(next)) {
    console.log(this)
    next()
}
// this : current aggregation object
```