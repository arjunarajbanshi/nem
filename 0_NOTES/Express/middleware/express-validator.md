> # Express Validator
- It is a middleware.

- Installation &rarr; `npm i express-validator`

## Various Methods

```js
notEmpty() /* Ensures the field is not an empty string, null, or undefined. */

isLength({ min, max }) // Checks if the string's length falls within a specified range.

isEmail() // Validates that the input is a properly formatted email address.

isStrongPassword() // Checks the string against complexity requirements (min length, lowercase, uppercase, numbers, and symbols).

matches(regex) // Validates the input against a custom Regular Expression.

isIn([values]) // Ensures the input matches one of the items in a provided array (useful for "roles" like ['admin', 'user']).

isMobilePhone() // Checks if the sting is a valid phone number

isISO8061() // Checks if a string is a valid date (YYYY-MM-DD)

isBoolean() // Checks if the value is true,false,1, 0

isAlphanumberic() // Ensures the string cntains only letters and numbers.

isURL() // Ensures the string is a valid web URL.

isInt() / isFloat() /* Checks if the value is an integer or a floating-point number.*/

toInt() // convert the input into sting into an actual interger

exists() // Checks if the field is present in the request object, even if it's empty.

array() // Validates that the input is an array.

trim() // Removes whitespace from both ends of a string.

normalizeEmail() // Standardizes email addresses (e.g., converting to lowercase, removing dots in Gmail addresses) to prevent duplicate accounts.

escape() // Replaces character like <,>,&,'," with entities to prevent XSS

bail() // Stops running validations for a field as soon as one fails (prevents unnecessary checks)

withMessage('error message') // Attaches a custom error string to the preceding validation rule.

optional() // Tells the validator to skip remaining checks if the field is not provided.

custom(value => ...) // Allows you to write your own logic. You can use this to check if a username already exists in your database.

```

## Example 1

```js
import express from "express";
import {
  body, // for req.body
  validationResult // this is where we get all errors
} from "express-validator";

const app = express();
app.use(express.json());

const users = [];

app.post(
  "/api/auth/register/",
  // 1. since it is a middleware, we can use directly like other route middleware
  body("email").isEmail().withMessage("Invalid email format"), // middleware that validate email
  body("password").isLength({ min: 8 }).withMessage("At least 8 chars"), // middleware that validate password
  
  (req, res) => {
    // 2. Check for errors
    const errors = validationResult(req); // captures all errors, if any middleware fails
    
    // 3. return if there any error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    users.push(req.body);
    
    res.status(201).json({
      message: "User created successfully"
    });
  } 
); 


app.listen(3000, () => console.log("Server running..."));
```