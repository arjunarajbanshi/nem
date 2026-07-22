> # Indexes

Improving reading performance with indexes

```js
// find().explain()

tourSchema.index({price: 1}) // 1 = asc and -1 = dsc. so indexing items based on price in asc 

// compound index
tourSchema.index({price: 1, rating: -1})
// {unique : true}
``` 