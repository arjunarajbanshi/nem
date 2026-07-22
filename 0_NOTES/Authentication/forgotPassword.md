> # Forgot/Reset Password using Email

## 1. User Schema / Model

```js
const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: String,

  password: String,
  passwordConfirm: String,

  passwordChangedAt: Date,

  passwordResetToken: String,
  passwordResetExpires: Date,
});
```

### Update `passwordChangedAt` whenever password changes

```js
userSchema.pre("save", function (next) {
  // Only run if password was modified and document isn't new
  if (!this.isModified("password") || this.isNew) return next();

  // Subtract 1 second to ensure JWT is created after password change
  this.passwordChangedAt = Date.now() - 1000;

  next();
});
```

### Create Password Reset Token

```js
userSchema.methods.createPasswordResetToken = function () {
  // Generate random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Save encrypted version in database
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token expires in 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // Return plain token to send via email
  return resetToken;
};
```

---

# 2. Forgot Password Controller

```js
exports.forgotPass = async (req, res) => {
  // 1. Get user based on email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "There is no user with this email!",
    });
  }

  // 2. Generate reset token
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  // 3. Create reset URL
  const resetURL = `${req.protocol}://${req.get(
    "host",
  )}/api/v1/users/reset-password/${resetToken}`;

  // 4. Email message
  const message = `
Forgot your password?

Submit a PATCH request with your new password and passwordConfirm to:

${resetURL}

If you didn't request a password reset, please ignore this email.
`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Reset token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({
      status: "fail",
      message: "There was an error sending the email.",
    });
  }
};
```

---

# 3. Routes

```js
router.post("/forgot-password", forgotPass);

router.patch("/reset-password/:token", resetPass);
```

---

# 4. Email Setup

Install Nodemailer

```bash
npm install nodemailer
```

### .env

```env
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=your_username
EMAIL_PASSWORD=your_password

EMAIL_FROM=Ar Anonymous <ar@anony.com>
```

---

## sendEmail Utility

```js
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
```

**Mailtrap Setup**

1. Create a Mailtrap account.
2. Create an Inbox.
3. Copy the SMTP credentials.
4. Store them in your `.env` file.

---

# 5. Reset Password Controller

```js
const crypto = require("crypto");

exports.resetPass = async (req, res) => {
  // 1. Hash incoming token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // 2. Find user with valid token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  // 3. Token invalid or expired
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Token is invalid or has expired!",
    });
  }

  // 4. Set new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  // Remove reset fields
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // passwordChangedAt is automatically updated
  // by the pre('save') middleware.

  // 5. Log user in
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
  });
};
```

---

# Complete Password Reset Flow

```text
User enters email
        │
        ▼
POST /forgot-password
        │
        ▼
Find user by email
        │
        ▼
Generate random token
        │
        ▼
Hash token and save to DB
        │
        ▼
Send plain token via email
        │
        ▼
User clicks link
        │
        ▼
PATCH /reset-password/:token
        │
        ▼
Hash incoming token
        │
        ▼
Find matching hashed token in DB
        │
        ▼
Check token hasn't expired
        │
        ▼
Update password
        │
        ▼
Clear reset token fields
        │
        ▼
Save user (updates passwordChangedAt)
        │
        ▼
Generate JWT
        │
        ▼
User logged in
```

## Updating current(loged-in) user password

```js
exports.updatePassword = async (req, res) => {
  /* Get user from collection */
  /* Check if POSTed current password is correct */
  /* If so update password */
  /* Log user in, send JWT */
};
```

## Deleting user

```js
const userSchema = mongoose.Schema({
  email:Sting,
  password: String,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
})

// using regular expression so that whatever start with find like findAndUpdate, findOne etc will work for it
userSchema.pre(/^find/,function(next){
  // this is query middleware so 'this' keyword points to current query which is being processing or requested

  // this.find({active: {$ne : false}})
  this.find(acitve: true) // only show result for active set to true, in this way user can be hidden without being totally deleted from the databse
  next()
})

```

```js
exports.deleteMe = async (req, res) => {
  // We don't delete user from db just make it inactive
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
};
```
