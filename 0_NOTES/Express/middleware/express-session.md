> # Express Session

```js
/*
SESSION
	HTTP stateless protocol.
	It is a way to store information about a user across multiple requests.
	Session are stored on the server.

express-session : A middleware, creates random session ID & put's it in a cookie.

Installation : npm i express-session

Usage : app.session({sessionObject})

 session Object
	secret - string, To sign session ID cookie(Required)
	saveinitialized - boolean,
	resave - boolean
	cookie : {
		secure - boolean, For HTTPS only
		maxAge - cookie expiration in milliseconds, 1000 milisec = 1 sec
		sameSite -
		}
	store - 
*/

const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'your_secret_key', // Used to sign the session ID cookie
  resave: false,             // Don't save session if unmodified
  saveUninitialized: true,   // Save new sessions that haven't been modified
  cookie: { secure: false }  // Set to true if using HTTPS
}));

app.get('/', (req, res) => {
  // Accessing session data via req.session
  if (req.session.views) {
    req.session.views++;
    res.send(`You visited this page ${req.session.views} times`);
  } else {
    req.session.views = 1;
    res.send('Welcome to the session demo. Refresh the page!');
  }
});

/*
app.use(session()) before any routes,
*/
```