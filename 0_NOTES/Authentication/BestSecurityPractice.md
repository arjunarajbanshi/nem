> # Best Security Practice

## Compromised Database
- Strongly encrypt passwords with salt and hash(bcrypt)

- Strongly encrypt password reset tokens(SHA 256)

## Brute Force Attacks
- Use bcrypt(to make login requests slow)

- Implement rate limiting(express-rate-limit)

- Implement maximum login attempts

## Cross-Site SCripting(XSS) attcks

- Store JWT in HTTPOnly cookies

- Sanitize user input data

- Set special HTTP headers(helmet package)

## Denial-of-service attack

- Implement rate limiting(express-rate-limit)

- Limit body payload(in body-parser)

- Avoid evil regular expressions

## NoSQL Query Injection

- Use mongoose for MongoDB(because of schema types)

- Sanitize user input data

## Other best practices and suggestions

- Always use HTTPS

- Create random password reset token with expiry dates

- Deny access to JWT after password change

- `Don't commit sensitive config data to git`

- `Don't send error details to clients`

- Prevent Cross-Site request forgery(csurf package)

- Require re-authentication before a high value action

- Implement a blacklist of untrusted JWT

- Confirm user email address after first creating account

- keep user logged in with refresh tokens

- Implement two-factor authentication

- Prevent parameter pollution causing Uncaught exceptions

