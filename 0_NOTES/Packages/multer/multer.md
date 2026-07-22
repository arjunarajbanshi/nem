> # Multer
>
> multer is middleware for handling multipart/form-data, which is the format browsers use when uploading files. In a typical Express + Node + MongoDB backend, the common flow is:

Client sends a form with a file.
Multer processes the upload.
Your Express route receives the file.
Store the file:

- On the local filesystem.
- In cloud storage (Cloudinary, S3, etc.).
- Or in MongoDB using GridFS (for large files).

## 1. Install packages

```bash
npm install express multer mongoose
```

## 2. Project structure
```
project/
│
├── uploads/
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── app.js
└── package.json
```

## 3. Configure Multer

```js
/* Create middleware/upload.js */

const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // cb = callback function
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
});

module.exports = upload;
```

## 4. Create MongoDB Model

```js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  image: String,
});

module.exports = mongoose.model("User", UserSchema);
```

## 5. Create Route

```js
const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const User = require("../models/User");

router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      image: req.file.filename,
    });

    await user.save();

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;

/* The field name "image" in upload.single("image") must match the form field sent by the client. */
```

## 6. Express App

```js
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/multerDemo");

app.use("/uploads", express.static("uploads"));

app.use("/api/users", require("./routes/userRoutes"));

app.listen(5000, () => {
  console.log("Server running");
});
```

## 7. HTML Example

```js
<form
    action="http://localhost:5000/api/users/register"
    method="POST"
    enctype="multipart/form-data"
>

    <input
        type="text"
        name="name"
    >

    <input
        type="file"
        name="image"
    >

    <button>
        Upload
    </button>

</form>
```

## 8. Testing with Postman

Method: POST
Body → form-data
Key Type Value
name Text John
image File profile.jpg

## 9. Access uploaded image

If the filename stored in MongoDB is `1751234567890.jpg` and you configured:

```js
app.use("/uploads", express.static("uploads"));
```

then the image URL is: `http://localhost:5000/uploads/1751234567890.jpg`

## Uploading multiple files

```js
// Multiple files with the same field
router.post("/photos", upload.array("photos", 5), (req, res) => {
  console.log(req.files);
  res.send(req.files);
});
```

```js
// Multiple named fields
router.post(
  "/profile",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files.avatar);
    console.log(req.files.cover);
  },
);
```

## req.file vs req.files

- `upload.single("image") `&rarr; req.file
- `upload.array("photos")` &rarr; req.files (array)
- `upload.fields([...]) `&rarr; req.files (object)

## Best practices

- Validate the uploaded file's type and size.
- Generate unique filenames to avoid collisions.
- Store only the file path or URL in MongoDB, not the file itself (unless you specifically need GridFS).
- Serve uploads through a static directory or upload them to a cloud storage service for production.
- Handle Multer errors (e.g., file too large or invalid file type) with Express error-handling middleware.

For most applications (profile pictures, product images, documents), the recommended pattern is:

- Use Multer to save the file (or upload it to cloud storage).
- Save the resulting filename or URL in MongoDB.
- Serve or retrieve the file using that stored path or URL.
