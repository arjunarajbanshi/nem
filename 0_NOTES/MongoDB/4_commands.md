## Basic

```bash
mongo # Takes you to mongodb shell

use ar # To switch to ar database, if ar database doesn't exists then it will create and switch to it

db.users.insertOne({name:"ar", age: 24}) # db represent current database which is are, users collection/table name, insertOne to insert one document to it.

db.users.find() # Gets all documents

show dbs # Displays databases

show collections # Displays collection, users

quit() # To exit shell
```

## Querying and Filter

```bash
db.users.find() # Gets all documents

db.users.find({name:"ar"}) # Get document having name = ar

# PROJECT : To get only required property
db.users.find({},{name:1}) # Get all documents but only shows name property in result

# $ represnts mongodb operator, lt, gt, gte, lte,
db.users.find({age: {$gte:23}}) # Get document having age greater than equal to 23

# And : both must be true for true
db.users.find({ age: {$gte:23}, age: {$lt:25} }) # Get document having age greater than equal to 23 and less than 25

# Or : any one true for true
db.users.find({ $or: [ {age : {$lt:24}}, {name : "ar" ] }) # Get documents having age less than 24 OR name = ar
```

## CRUD Operation

```bash
# CREATE
db.users.insertMany( [{name:"ms", age: 23},{name:"rr", age: 24},{name:"lt", age:17}, {name:"nm", age:14}] ) # To insert more than one

# READ
db.users.find() # Get all docs

# UPDATE : update( {which doc to update}, {what to update} ), partial update
db.users.updateOne( {name:"rr"}, {$set:{name:rbr}} ) # To update document having name = rr to name = rbr

db.users.updateMany( {age: {$gte: 18}}, {$set: {adult: true}} ) # To update all doc having age greater than equal to 18 to adult set to true

# REPLACE : replaces entirely
# replaceOne() and replaceMany()

# DELETE : deleteOne() and deleteMany()
db.users.deleteOne( {name:"nm"} ) # Deletes doc having name = nm

db.users.deleteMany( {age: {$lt:18}} ) # Delete all docs having age less than 18

db.users.deleteMany({}) # Deletes all docs
```

## End
