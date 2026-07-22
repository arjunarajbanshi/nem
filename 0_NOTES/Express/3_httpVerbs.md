> # HTTP Verbs(methods)

## HTTP Verbs
```js
/* HHTP verbs : get(), post(), delete(), patch(), update() etc And these methods takes two Parameters 
	- Path
	- CallbackFunction(req, res)
		req ==> request
		res ==> response
			Above methods are called when a request is started and we need to handle it.
*/

app.get('/', (req, res) => { /* */ }) // READ
app.post('/', (req, res) => { /* */ }) // CREATE
app.put('/', (req, res) => { /* */ }) // UPDATE
app.patch('/', (req, res) => { /* */ }) // Partial UPDATE
app.delete('/', (req, res) => { /* */ }) // DELETE

/*
use try and catch() block inside that callBackfunction
async ==> makes function asynchronous
await ==> pauses exacution until promises settles
try ==> this block contains the async operations
catch ==> this block handles any error

.then() and catch() are old method
*/
```


## Send response to client
```js
/* send() ⇒ To send response */
res.send('Hello') /* Passing string as response sets the content-Type header to text/html */

res.send( {} ) /* Passing object or array sets content-Type header to application/json */
// and Finally send() closes the connection.
// send() automatically sets the content-Length HTTP response header, unlike end() which requires us to do that.
```

## Send empty response
```js
/* Use end() to send empty response.*/
res.end()
/* send() automatically sets the content-Length 
HTTP response header, unlike end() which requires us to do that.*/
```

## Set the HTTP response status
```js
/* use the status() method on the response object to set HTTP
response status */

res.status(404).end()

//or
res.status(404).send('Not Found')

// shortcut using sendStatus() 
res.sendStatus(200) // res.status(200).send('OK')
res.sendStatus(403) // res.status(403).send('Forbidden')
res.sendStatus(404) // res.status(404).send('Not found')
res.sendStatus(500) // res.status(500).send('Internal Server Error')
```

## Send a JSON response
```js
/* Use res.json() to send json to client */
res.json(
{username:'flavio'}
)
```


