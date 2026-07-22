const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // for parsing incoming request bodies with JSON payloads.

// STEP 1 : Connect to Database
mongoose.connect("mongodb://127.0.0.1:27017/natoursDB")
    .then(() => console.log("MongoDB connected"))
    .catch(console.error);

// STEP 2 : Create Schema and Model
const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        age: Number
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

/* STEP 4 : Create APIs */
// CREATE
app.post("/api/v1/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ ALL
app.get("/api/v1/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// READ ONE
app.get("/api/v1/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// UPDATE
app.put("/api/v1/users/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// DELETE
app.delete("/api/v1/users/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
});

// STEP 3 : Create listening port for Server
const PORT = 3000;
app.listen(PORT, () =>
    console.log('Server running at port 3000')
);

/*
Mongoose model methods
 create()
 find()
 findByIdAndUpdate()
 findByIdAndDelete()
*/