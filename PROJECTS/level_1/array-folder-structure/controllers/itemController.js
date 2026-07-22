const items = require('../data/items')

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
    // const item = items.find(i => i.id === parseInt(req.params.id));
    // if (!item) return res.status(404).send('Item not found');
    res.json(req.item);
}

const updateItem = (req, res) => {
    // const item = items.find(i => i.id === parseInt(req.params.id));
    // if (!item) return res.status(404).send('Item not found');

    req.item.name = req.body.name;
    res.json({ message: "Item updated successfully", updatedItem: req.item });
}

const deleteItem = (req, res) => {
    const index = items.findIndex(i => i.id === req.item.id);

    items.splice(index, 1); // start at index then remove 1 item
    res.json({ message: "Item deleted successfully!" });
}

module.exports = {
    welcome,
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem
}