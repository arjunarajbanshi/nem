# Common Mongoose Methods

## Common Options

```js
{
  new: true,
  runValidators: true,
  upsert: true,
}
```

* `new` → Return updated document.
* `runValidators` → Run schema validation during updates.
* `upsert` → Create document if none matches.

---

# CREATE

```js
Model.create(doc)
```

```js
await User.create({
  name: "John",
});
```

Using `new`:

```js
const user = new User({
  name: "John",
});

await user.save();
```

> `create()` internally creates a document and calls `save()`.

---

# READ

```js
Model.find(filter)

Model.findOne(filter)

Model.findById(id)
```

Examples:

```js
User.find({});

User.find({ email });

User.findOne({
  name: "Arjun",
});

User.findById(user._id);

User.find()
  .select("name email -_id");

User.find()
  .limit(5)
  .skip(5);

User.find()
  .sort({ age: -1 });

User.countDocuments();

User.countDocuments({
  name: "Arjun",
});
```

Useful methods:

```js
lean()
```

Returns plain JavaScript objects instead of Mongoose documents.

Useful for read-only queries.

```js
const users = await User.find().lean();
```

---

# UPDATE

```js
findByIdAndUpdate()

findOneAndUpdate()

updateOne()

updateMany()
```

Example:

```js
await User.findByIdAndUpdate(
  user._id,
  {
    name: "Updated Name",
  },
  {
    new: true,
    runValidators: true,
  }
);
```

Using `$set`:

```js
await User.updateOne(
  { email },
  {
    $set: {
      age: 20,
    },
  }
);
```

---

# DELETE

```js
findByIdAndDelete(id)

deleteOne(filter)

deleteMany(filter)

findOneAndDelete(filter)
```

Example:

```js
await User.deleteOne({
  email,
});
```

---

# REPLACE

```js
findOneAndReplace(filter, replacement, options)
```

Example:

```js
await User.findOneAndReplace(
  { email },
  replacementObject,
  {
    new: true,
  }
);
```

---

# Other Useful Methods

```js
countDocuments(filter)
```

Counts matching documents.

```js
distinct(field, filter)
```

Returns unique values.

Example:

```js
User.distinct("country");
```

---

# Good Practices

* Always use `await` with Mongoose queries.
* Create indexes for frequently searched fields.
* Use `lean()` for read-only queries.
* Use `populate()` only when necessary.
* Keep schemas small and focused.
* Prefer embedding for small, tightly related data.
* Prefer referencing for shared or frequently updated data.
* Handle database errors with `try...catch`.
