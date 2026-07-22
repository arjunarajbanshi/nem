> # PUG
Pug is a template engine that lets you generate HTML with a clean, indentation-based syntax.

## Installation
```bash
npm install pug 
```

## VS-Code Extension
- Pub beautify by mrmlnc

## Folder Structure
```js
project/
│
├── app.js
├── package.json
├── views/ // This is where we keep our pug templete files
│   ├── index.pug
│   └── about.pug
└── public/
    ├── css/
    └── images/
```

## Using pug in express
```js
const express = require("express");
const app = express();
const path = require("path");

// Set Pug as the view engine
app.set("view engine", "pug");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Static files, if we have to use images or other assets use public folder, css, js file also, we can also have inner folder
app.use(express.static(path.join(__dirname, "public")));

// rendering index page at root
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    message: "Welcome to Express with Pug!"
    // This is how we render and add variables
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

## Create a Pug Template
```bash
doctype html
html
  head # To keep other inside head use tab 
    title= title # or just : title title, = not required
    link(rel='stylesheet' href='css/style.css') # for attribute use parenthesis() and use single quote
  body
    h1= message
    p This page is rendered using Pug.
    # //- for writing pug comment or just normal html comment
    script(src='/js/script.js') # To include js file
```
```html
<!-- When you visit http://localhost:3000, the generated HTML will be:  -->

 <!DOCTYPE html>
<html>
<head>
  <title>Home Page</title>
  <!-- title comes from varibles we defined -->
</head>
<body>
  <h1>Welcome to Express with Pug!</h1>
  <p>This page is rendered using Pug.</p>
</body>
</html>
```

```js
p= message.toUppercase()  // directing writing js
p.para // to create classname use dot followed name
p.para.para2 // for two classed
p#para // for id 
```

### Pug Syntax Cheat Sheet

| HTML                      | Pug                   |
| ------------------------- | --------------------- |
| `<h1>Hello</h1>`          | `h1 Hello`            |
| `<p>Text</p>`             | `p Text`              |
| `<div class="box"></div>` | `.box`                |
| `<div id="main"></div>`   | `#main`               |
| `<a href="/">Home</a>`    | `a(href="/") Home`    |
| `<img src="logo.png">`    | `img(src="logo.png")` |
| `<input type="text">`     | `input(type="text")`  |
| `<li>Item</li>`           | `li Item`             |
| `<p>#{name}</p>`          | `p #{name}`           |

--- 

### Example 1
```

```

## Include external file
```html
<!-- index.pug -->
include fileName

block content

include footer
````

```html
<!-- about.pug -->
extend index

block content
  h1 This is about page
```

```js
// index.js
app.get("/about", (req, res) => {
  res.status(200).render("about", {
    title: 'About page'
  });
});
```
```
mixin name()
```
using of - and +
loop


## Common Express Methods

```js
res.render("index");                    // Render index.pug
res.render("index", { name: "John" });  // Pass data
```

> ## Continue...

