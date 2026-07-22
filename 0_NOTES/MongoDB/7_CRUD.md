```js
/* request body is available through req.body */
create(); // creates documents
new ModelName({}).save(); // creates documents

find(); // return all documents
find({}); // returns all documets

/*  route params values or id, can be available through req.params or req.params.id */
findById(id); // returns single document using given id

findByIdAndUpdate(id, whatToupdatedata, {
  options,
}); /* new : if sets to true returns updated documents, runValidators : if sets to true runs Schema validation */

findByIdAndDelete(id); // deletes document using provided id
```

## Filtering and Querying

```js
console.log(req.query); // accessing query params

// method 1
Model.find({ duration: 5, difficulty: easy });

// method 2 : mongoose
Model.find().where("duration").equals(5).where("difficulty").equals("easy");

// Using postman
Model.find(req.query) // controller
/api/v1/tours/?rating=4&difficulty=easy // separated using & 
// or by simply adding key and value in query params table below

// lt : less than, gt : greater than, USE BRACKET [] to specify the operators



```
