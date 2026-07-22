> # Multer

```js
// multer : To handle file uploads

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Files will be saved in 'uploads' folder

// 'profilePic' is the 'name' attribute from your HTML <input type="file">
server.post('/upload', upload.single('profilePic'), (req, res) => {
    console.log(req.file); // Contains file info (size, path, etc.)
    console.log(req.body); // Contains any other text fields in the form
    res.send("File uploaded successfully!");
});

/*
To install : npm install multer

multer parses incoming multipart/form-data, so we can access both files and text
fields from req.
*/
```