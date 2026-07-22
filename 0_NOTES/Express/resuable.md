
A clean way to make delete operations reusable in an **Express + MongoDB (Mongoose)** app is to create a generic controller that accepts any Mongoose model.

### `utils/deleteOne.js`

```javascript
const deleteOne = (Model) => {
  return async (req, res) => {
    try {
      const { id } = req.params;

      const document = await Model.findByIdAndDelete(id);

      if (!document) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

module.exports = deleteOne;
```

---

### Example Model (`models/Product.js`)

```javascript
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);
```

---

### Controller

```javascript
const Product = require("../models/Product");
const deleteOne = require("../utils/deleteOne");

exports.deleteProduct = deleteOne(Product);
```

---

### Route

```javascript
const express = require("express");
const router = express.Router();
const { deleteProduct } = require("../controllers/productController");

router.delete("/:id", deleteProduct);

module.exports = router;
```

---

## Reuse for any model

```javascript
const User = require("../models/User");
const Order = require("../models/Order");
const Category = require("../models/Category");

exports.deleteUser = deleteOne(User);
exports.deleteOrder = deleteOne(Order);
exports.deleteCategory = deleteOne(Category);
```

This way, you only write the delete logic once and can reuse it for every Mongoose model by passing the model into `deleteOne()`.
