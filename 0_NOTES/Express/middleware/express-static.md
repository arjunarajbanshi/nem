> # Serving static files in Express

To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

`express.static(root, [options]);`

The root argument specifies the root directory from which to serve static assets.

## Example
For example, use the following code to serve images, CSS files, and JavaScript files in a directory named public:

`app.use(express.static('public'));`

Now, you can load the files that are in the public directory:

```bash
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

> NOTE : Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.

### _To use multiple static assets directories, call the express.static middleware function multiple times:_

```
app.use(express.static('public'));
app.use(express.static('files'));
```

[Read more...](https://expressjs.com/en/5x/starter/static-files/)