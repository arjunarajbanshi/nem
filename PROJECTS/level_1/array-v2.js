/* Simple CRUD using array methods */
const express = require('express');

const app = express();

/* middleware : Make sure to keep middleware above routes */
app.use(express.json());

app.use((req, res, next) => {
    console.log("Application level middleware : I will run in every incoming request!");
    req.requestTime = new Date().toISOString();
    console.log(req.requestTime);
    next()
})

/* array of objects */
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

// Action/controllers
const welcome = (req, res) => {
    res.send("Welcome to the EXPRESS BACKEND!")
}

const createItem = (req, res) => {
    const { name } = req.body;
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json({ message: "Item created successfully", item: newItem });
}

const getItems = (req, res) => {
    res.json(items);
}

const getItem = (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
}

const updateIetm = (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    item.name = req.body.name;
    res.json({ message: "Item updated successfully", updateIetm: item });
}

const deleteItem = (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    const deletedItem = items.splice(itemIndex, 1);
    res.json({ message: "Item deleted successfully!" });
}

/* routes */
// app.get('/api/v1/', welcome)
// app.post('/api/v1/items', createItem);
// app.get('/api/v1/items', getItems);
// app.get('/api/v1/items/:id', getItem);
// app.patch('/api/v1/items/:id', updateIetm);
// app.delete('/api/v1/items/:id', deleteItem);

/* even simpler using route */
app.route("/api/v1").get(welcome)
app.route("/api/v1/items").get(getItems).post(createItem)
app.route("/api/v1/items/:id").get(getItem).patch(updateIetm).delete(deleteItem)

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});