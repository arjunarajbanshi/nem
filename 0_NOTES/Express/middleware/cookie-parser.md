> # Cookie-Parser

```js
/*
 cookie-parser : To read cookies from incoming requests.
Installation : npm i cookie-parser

Syntax for setting cookie
	res.cookie('name','value',[options]) 
		name: name(key) of cookie(string). eg. 'sessionId, theme'
		value : Data(number,string,boolean,object) we want to store in cookie
		options object: signed, httpOnly, maxAge, sameSite, secure, path

Syntax for remvoing cookie
	res.clearCookie('cookieName')
		use to logout user : server

Read cookie
	req.cookies
		req.cookies.cookieName : used to authenticate(server)
 */

import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

// 1. Initialize cookie-parser with a secret key for signed cookies
app.use(cookieParser('my_super_secret_key'));

// Route to "Log In" and set a signed cookie
app.get('/login', (req, res) => {
    res.cookie('user_id', '12345', {
        signed: true,
        httpOnly: true,
        maxAge: 60 * 1000
    });
    res.send('You are now logged in! Cookie has been signed and set.');
});

// Route to "Check Profile" by reading the cookie
app.get('/profile', (req, res) => {
    // Note: Signed cookies are accessed via req.signedCookies
    const userId = req.signedCookies.user_id;

    if (userId) {
        res.send(`User ID from signed cookie: ${userId}`);
    } else {
        res.status(401).send('No valid session found. Please login.');
    }
});

// Route to "Logout" and clear the cookie
app.get('/logout', (req, res) => {
    res.clearCookie('user_id');
    res.send('Cookie cleared. You are logged out.');
});

app.listen(PORT, () => {
    console.log("Server running!");
});



/*
Place cookie-parser() before any route definition. Simply place after
express() app initialization.

Use it whenever we need to read data stored on the user's browser(eg. 'Remember Me',
token, dark mode preference, session ID etc).

Options :
 httpOnly - prevents document.cookie access in JS. prevents XSS attacks.
 secure - cookie is sent over HTTPS only.
 signed - sign the cookie with your secret key. Detects if user changed cookie value.
 maxAge - lifetime in milliseconds. Controls how long the session lasts.
 sameSite - Strict, Lax or none. Prevents CSRF.

Developer Tools > Application tab > left sidebar : click cookies
	If using signed, value starts with s:
*/
```

## cookieParser with JWT

```js
// npm i jsonwebtoken

import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const JWT_SECRET = 'your_super_complex_jwt_secret';
const COOKIE_SECRET = 'your_cookie_signing_secret';

app.use(express.json());
app.use(cookieParser(COOKIE_SECRET)); // signed cookie

// 1. LOGIN: Generate JWT and wrap it in a cookie
app.post('/api/login', (req, res) => {
    // Authenticate user logic here...
    const user = { id: 1, role: 'admin' };

    // Create the JWT
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

    // Set the cookie
    res.cookie('access_token', token, {
        httpOnly: true,     // Protect against XSS
        secure: true,       // Use HTTPS only (set to false for local dev)
        signed: true,       // Protect against tampering
        sameSite: 'Strict', // Protect against CSRF
        maxAge: 3600000     // 1 hour
    });

    res.json({ message: 'Logged in successfully' });
});

// 2. MIDDLEWARE: Verify the JWT from the cookie
const authenticate = (req, res, next) => {
    const token = req.signedCookies.access_token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Add user data to request object
        next();
    } catch (err) {
        res.clearCookie('access_token');
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// 3. PROTECTED ROUTE
app.get('/api/me', authenticate, (req, res) => {
    res.json({ user: req.user });
});

app.listen(3000);

/*

*/
```