> # express-rate-limit

```js
/*
Basic rate-limiting middleware for express use to limit repeated requests to public APIs and/or endpoints such as password reset.

Installation
	npm install express-rate-limit

*/
// Example 1 
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	// max: 100,
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message: 'Too many request from this ip. Try again after some time!',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})
 
app.use(limiter) 


/* Example 2
To use it only for certain path eg. limit only calls to the /auth/* endpoints */
app.use('/auth',limiter)

/* Example 3 : In middleware */
app.post('/reset_password', limiter, (req, res) => {
	// ...
})

```