> # AUTHENTICATION

## JWT
```js
// Installation
npm install jsonwebtoken

// JWT syntax
header.payload.signature
 
// function to generate a JWT token
jwt.sign(payload, secretkey, [options, callback])
// secretkey ==> can be anything and put in .env

// To verify token
jwt.verify(token,secretkey,[options,callback]) 

```

## BcryptJs

```js
// Installation
npm i bcryptjs

// To hash a password
const salt = await bcrypt.genSalt(10); // 10 rounds
const hash = await bcrypt.hash('myPa$$w0rd', salt)

// Always save hash password in database

// To check a password
await bcrypt.compare('myPa$$w0rd', hash)

```

## Logic

signup logic
- we will get the request
   - destructure email or username and password from req.body
- check user exists or not
   - YES : send error as user exists
   - NO : Create new user

Sign-In Logic
- destructure usename/email and password from req.body
- check user exists or not may not created account
   - NO : error user not found
   - YES :  check passoword and compare
      - If didn't match, error invalid password
      - Matches, create new token
   - success massege

```js
import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3000;

// Secrets (In production, use process.env)
const JWT_SECRET = 'super_secret_jwt_key';
const COOKIE_SECRET = 'cookie_sign_secret';

app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

// Mock Database
const users = [];

// 1. REGISTER: Hash password with bcrypt
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Hash password: 10 is the "salt rounds"
    const hashedPassword = await bcrypt.hash(password, 10);
    
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});

// 2. LOGIN: Compare hashes and set JWT Cookie
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare plain text password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access_token', token, {
            httpOnly: true,
            signed: true,
            secure: false, // Set to true in Production (HTTPS)
            sameSite: 'lax',
            maxAge: 3600000 
        });

        return res.json({ message: 'Logged in!' });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// 3. LOGOUT: Clear the cookie
app.post('/api/logout', (req, res) => {
    res.clearCookie('access_token');
    res.json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => console.log("listening on port 3000");

/*

*/
```

Refresh Token
```js
import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3000;

const ACCESS_SECRET = 'access_secret_123';
const REFRESH_SECRET = 'refresh_secret_456';
const COOKIE_SECRET = 'cookie_sign_789';

app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

// Mock Database
const users = [];
let refreshTokens = []; // In production, store this in MongoDB/Redis

// 1. LOGIN: Issue both tokens
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
        // Create Tokens
        const accessToken = jwt.sign({ name: username }, ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ name: username }, REFRESH_SECRET, { expiresIn: '7d' });

        refreshTokens.push(refreshToken); // Save to DB

        // Set Access Token Cookie
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            signed: true,
            maxAge: 900000 // 15 mins
        });

        // Set Refresh Token Cookie (usually different path or longer age)
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            signed: true,
            path: '/api/refresh', // Only sent to the refresh endpoint
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.json({ message: 'Logged in' });
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

// 2. REFRESH: Exchange Refresh Token for a new Access Token
app.post('/api/refresh', (req, res) => {
    const refreshToken = req.signedCookies.refresh_token;

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'Refresh token invalid' });
    }

    jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token expired' });

        const newAccessToken = jwt.sign({ name: user.name }, ACCESS_SECRET, { expiresIn: '15m' });

        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            signed: true,
            maxAge: 900000
        });

        res.json({ message: 'Token refreshed' });
    });
});

// 3. LOGOUT: Remove from DB and clear cookies
app.post('/api/logout', (req, res) => {
    const refreshToken = req.signedCookies.refresh_token;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken); // Remove from DB

    res.clearCookie('access_token');
    res.clearCookie('refresh_token', { path: '/api/refresh' });
    res.json({ message: 'Logged out' });
});

app.listen(PORT, () => console.log(`Secure API at http://localhost:${PORT}`));
```