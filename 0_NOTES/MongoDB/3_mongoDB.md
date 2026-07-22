> # MongoDB
__MongoDB__ is a __NoSQL document database__ that stores data as flexible, JSON-like documents instead of rows and columns. It's designed to make it easier to work with data that changes frequently or has varying structures.

- Table is Collection.
- Rows is Documents

For example, instead of storing a user in a table:

| id | name  | age |
| -- | ----- | --- |
| 1  | Alice | 25  |

MongoDB stores it as a document:
```json
{
  "_id": 1,
  "name": "Alice",
  "age": 25
}
```

Each document can have different fields:
```json
{
  "_id": 2,
  "name": "Bob",
  "email": "bob@example.com",
  "skills": ["Python", "MongoDB"]
}
```
This flexibility is one of MongoDB's biggest advantages.
