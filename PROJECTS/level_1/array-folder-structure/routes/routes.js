const { Router } = require('express');
const { welcome, createItem, getItems, getItem, updateItem, deleteItem } = require("../controllers/itemController");
const { checkBody, neededID } = require('../middleware/middleware');

const router = Router();

router.route("/").get(welcome)
router.route("/items").get(getItems).post(checkBody, createItem) // chaining middleware
router.route("/items/:id").get(getItem).patch(checkBody, updateItem).delete(deleteItem)

module.exports = router;