> # express.urlencoded()

```js
// express.urlencoded() - To handle form data

app.use(express.urlencoded({ extended: true })); /* extended:true - allows
to parse complex, nested objects. This middleware also puts form data into req.body */

app.post('/form', (req, res) => {
  console.log(req.body); 
  res.send('Form data received');
});

/*
When a user submits a standard HTML form (like a signup form), 
the browser usually sends the data as application/x-www-form-urlencoded.
to read this use this middleware.
*/

```