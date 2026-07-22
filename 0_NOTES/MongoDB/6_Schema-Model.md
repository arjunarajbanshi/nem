> # Schema and Model

- Mongoose Schema &rarr; Where we model our data, by describing the structure of data, default values and validations.

- Mongoose Model &rarr; A wrapper for the schema, proving and interface for the database for CRUD operations.

```js
import mongoose from "mongoose";

/* Creating UserSchema using mongoose.Schema and saving it in UserSchema vairable */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    currency: {
      type: String,
      enum: ["USD", "NPR", "INR"],
      default: "USD",
    },
  },
  {
    timestamps: true,
  },
);

/* Saving/storing User model in User Variable */
const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    UserSchema,
  ); /* Use User Model if it exists otherwise Create Model called 'User' using UserSchema */

// Convention to use first letter in Capital for Model name and variables

export default User;
```

> ## Data validations and sanitization

```js
select:false // field doen't show in any request, useful for hiding password field. So to select exclusively select required field use select('+password')

// data validators
required: true
unique: true
min
max
minlength
maxlength


lowercase: true
uppercase: true
trim: true
default: value
enum: [], // values that are allowed
match: [/regex/, "Invalid value"]
select: false
index: true
```

```js
level : {
  emum : ['easy', 'medium', 'difficult'],
  message: 'Level is required'
},
coordinates:[Numbers] // Coordinates field will have an array of numbers
```

```js
// custom data validation

priceDiscount : {
  validate : function(val) {
    return val < this.price // Pure function and always return true or false
  }
}

// or with message
priceDiscount : {
  type : Number,
  validate : {
    validator : function(val){
      return val < this.price // this current doc, works only on creation
    }
  },
  message : 'Discount price ({val}) should be below regular price!' // message has access to above function agrument
}
```

```js
/* Above validate/validator can be also used for checking cofirmed password */
validate: {
  validator:function(el){
    return el === this.password;
  },
  message : 'Password do not matched'
}
// el is the value confirmed password field received
```

## Hashing password in schema

```js
userSchema.pre("save", async function (next) {
  // only run if password is modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  // deleting confirmed password before saving it to db
  this.passwordConfirmed = undefined;
  next();
});

/* undefined means a variable has been declared but has not yet been assigned a value, while null is an assignment value that represents the intentional absence of any object value. Think of undefined as a missing box that the system hasn't set up yet, and null as an empty box that a developer deliberately placed there */
```

## Comparing password in schema

```js
useSchema.methods.correctPassword = async function (
  candidatePassword,
  usePassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
};

/* then use in controller as
user.correctPassword(password, user.password)
user = register user
password = password provided by this user
*/
```


## Add

```js
/*  */
```


## Packages for data validation and sanitization

- `zod` : recommended and popular now a days
- `express-validator` :
- `validator` library : for validation and sanitization
