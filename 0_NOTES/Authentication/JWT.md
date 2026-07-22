> # JWT(Toke Based Auth)

- JWT provide a stateless authentication mechanism that's compact and self-contained.
- JWT doesn't require a server to store session data.
- Ideal for stateless API architecture and microservices.
- Best for SPAs, Mobile apps
- Complexity : Medium
- Security level : High

```js
/* JWT consists of 3 parts separated by dots( . )
Header.Payload.Signature

1. Header
It typically consists of two parts: the type of token(JWT) and
the signing algorithm beig used, such as HMAC, SHA256 or RSA.*/
{
    “alg”: "HS256",
    “typ”: “JWT”
}
/*This JSON is then Base64Url encoded to form the first part of the JWT.*/


/*
2.Payload
It contains the claims. Claims are statements about an entity (typically,
the user) and additional data. There are three types of claims:
	Registered clains
	Public clais
	Private claims
*/
// EXAMPLE : JSON
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
/* This JSON is Base64Url encoded to form the second part of the JWT */

/*
3. Signature
It is used to verify that the sender of JWT is who it says it is and to 
ensure that the message wasn't changed along the way.
*/

// Example of token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## Installation
```js
// Installation
npm i jsonwebtoken

// To generate token ********************
jwt.sign(payload, secretOrPrivateKey, [options,callback])

/* 
payload
	object literal, buffer or string

secretOrPrivateKey
	string, buffer, object

option like
 algorithm : default HS256

 expiresIn : expressed in miliseconds or string describing a time.
 	example: 60, '2 days', '10h', '7d'
 
etc...
*/

const jwt = require('jsonwebtoken');

const payload = { userId: 123, role: 'admin' };
const secretKey = 'your-256-bit-secret';

// Generating the token
const token = jwt.sign(payload, secretKey, { 
  expiresIn: '1h',    // Options object
  algorithm: 'HS256' 
});


/* VERIFYING A TOKEN *************************** */ 
jwt.verify(token, secretKey,[options,callback])
/*
We get token from req.headers.authorization
*/
```

## Example

```js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const JWT_SECRET = 'your-jwt-secret-key';

// Sample user database
const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'user' }
];

// Login route - generate token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create payload for JWT
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  // Sign token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

// Middleware for JWT verification
const authenticateJWT = (req, res, next) => {
  // Get auth header - The Authorization header is commonly used to send authentication tokens
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Protected route
app.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: 'Profile accessed', user: req.user });
});

// Role-based route
app.get('/admin', authenticateJWT, (req, res) => {
  // Check if user has admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: admin role required' });
  }

  res.json({ message: 'Admin panel accessed' });
});

// Start server
app.listen(8080, () => {
  console.log('Server running on port 8080');
}); 
```

