const items = require("../data/items")

/* router.param() (or app.param()) only runs when the route contains that parameter. If doesn't contain then this middleware won't run.

In my case, when i skip, route parameter in patch and delete, this param middleware didn't run so, so make separate middleware for checking missing ID even if we skip id in route parameter it will run.

*/
// This middleware mainly focous on checking if given ID is valid or not
const checkID = (req, res, next, id) => {
    // id is the actual value of route param
    // if (!id) {
    //     return res.status(400).json({ message: "ID is Required!" });
    // }

    const item = items.find(item => item.id === Number(id));

    if (!item) {
        return res.status(404).json({
            success: false,
            message: "Invalid ID"
        });
    }
    // Store the item for later use, necessary as it has been modified by this middleware
    req.item = item;

    next();
};

const checkBody = (req, res, next) => {

    if (!req.body.name) {
        return res.status(400).json({
            success: "fail",
            message: "Item name is missing!",
        });
    }

    next()
}

/* This will still won't work for /api/items/ or when skiping route parameter. Simply route never matches and hence it looks for another matching routes. */
const neededID = (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: "false",
            message: "ID is required!",
        });
    }
    next()
}

/*
So, the solution is creating separate route for missing ID

router.patch("/items", (req, res) => {
    return res.status(400).json({
        success: false,
        message: "ID is required."
    });
});

router.patch("/items/:id", checkBody, updateItem);

For DELETE, PATCH, PUT etc we always require route param for identify item and matches route param /api/v1/items/:id
*/

module.exports = {
    checkID,
    checkBody,
    neededID
}