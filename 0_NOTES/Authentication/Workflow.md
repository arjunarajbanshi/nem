> # Workflow

## THE LOGIN WORKFLOW
```js
/*
REQUEST : User send their credentials(email,password) via a POST request.

VALIDATION : The server verifies the credentials against the database.
		Finds user in Database.
		Compares hashed password

GENERATION : The server creates a JWT signed with a Secret Key.

DELIVERY : The Server sends the token back to the client.
	Best Practice : Send it as an HttpOnly Cookie to prevent XSS.

STORAGE : The browser stores the token automatically(if using cookies)
	or manually(if using LocalStorage).

*/
```

### Code Example
```js
/*
Install dependencies
npm install exprss mongoose jsonwebtoken bcryptjs dotenv
*/
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const login = async (req, res) => {
// clients sent via POST
  const { email, password } = req.body;

// Verify against database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
// Generate token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
// send token
  res.json({ token });
};
```

### FRONTEND
```js
/*
Frontend
- Check localStorage/Cookies :If token exists, the user is likely
	"logged in"
- State Management(Optional) : Store the "isLoggedIn" status in a 
	 global state (React Context or Redux)

GENERAL WORKFLOW ******
- Check : Frontend Checks if a token exists
- Protection : If no token, redirect the user to the /login page.
- Validation : When the app loads, send the token to a /me or /validate
	endpoint on your server.
- Cleanup : If the server says the token is invalid/expired, the frontend
	deletes the token and logs the user out.

*/

const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token; // Returns true if token exists, false otherwise
};

/*
localStorage.setItem(TOKEN_KEY,token) : To set token
localStorage.removeItem(TOKEN_KEY); : To remove token
*/
```

## AUTHENTICATED STATE(Staying Logged In)
```js
/*
EVERY REQUEST : For every protected API call, the browser sends the token in the header or cookie.

THE CHECK : Check token if token is missing or invalid
	 return if missing/invalid
	If present, Verify token
	Optional..
		Check if user exists or not(like loggedIn and deleted account)
		Check if user changed password after token was issued.
    


*/

// also check error for expired token or invalid token
```

### Example
```js
import jwt from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

/* FORMAT
 Authorization: Bearer <VALID_TOKEN>
*/

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ loggedIn: false });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId }
    next();
  } catch (error) {
    return res.status(401).json({ loggedIn: false });
  }
};

export default isLoggedIn;

```

## Reset password
- User submits email
   - Verify email : DO NOT reveal if user exists (security best practice) 
- Server generates secure token 
   - Token is hashed & stored : (Never store plain Token, always hashed)
- Email sent with reset link
   - https://your-frontend.com/reset-password?token=XXXX
- User opens link &rarr; enters new password
- Token verified &rarr; password updated → token invalidated

```js
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const resetPasswdController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await User.findOne({ email });

    // Do NOT reveal user existence
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If the email exists, a reset link has been sent.",
      });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    
     // Generate 6-digit OTP : If you want OTP-based reset
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwdResetToken = hashedToken;
    user.passwdResetTokenExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    await user.save(); // save

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 5 minutes.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to email.",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

```

### Reset Password (From Email Link)
```js
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const resetPasswordController = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Token and new password are required",
    });
  }

  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      passwdResetToken: hashedToken,
      passwdResetTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Invalidate token
    user.passwdResetToken = undefined;
    user.passwdResetTokenExpiresAt = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

```

### Email sample setup
```js
/*
Installation : npm i nodemailer
*/
const nodemailer = require("nodemailer");

// Step 1 : Create transporter
const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
// You can use mailtrap, just get port, host, auth etc
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// Step 2 : Send mail
  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;

```