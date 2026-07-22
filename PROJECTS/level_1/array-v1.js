// Simple CRUD using array methods
const express = require('express');

const app = express();

// middleware
app.use(express.json()); 

// array of objects
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

app.get('/api/v1/', (req, res) => {
    res.send("Welcome to the EXPRESS BACKEND!")
})

// Create (POST): Add a new item
app.post('/api/v1/items', (req, res) => {
    const { name } = req.body;
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read (GET): Get all items
app.get('/api/v1/items', (req, res) => {
    res.json(items);
});

// Read (GET): Get a single item by ID
app.get('/api/v1/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});

// Update (PATCH - partial update): Update an item by ID
app.patch('/api/v1/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    item.name = req.body.name;
    res.json(item);
});

// Delete (DELETE): Delete an item by ID
app.delete('/api/v1/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    const deletedItem = items.splice(itemIndex, 1);// start at itemIndex then remove 1 item
    res.json(deletedItem);
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

/*
express.josn() :  require inorder to read incoming req data in CREATE/POST method, Without this middleware, attempting to read req.body on data-heavy actions like POST or PUT requests will return undefined

req.param => To captures dynamic routes parameters
api/v1/items/:id/:subId/:subSubId => can have multiple route params within single route
api/v1/items/:id/:subId/:subSubId? => ? makes optional so subSubId is optional

TRICK 
- If we multiply a string("1") with number(1) it will give result in number
    - req.params.id * 1 = number
*/