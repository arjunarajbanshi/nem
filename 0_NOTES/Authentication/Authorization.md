> # Authorization roles and permission

```js
/*
In userSchema,
roles: {
    type: String,
    enum: ['user', 'member', 'contributor', 'admin'],
    default: 'user'
}
*/

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: "false",
        message: "You do not have permission to perform this action!",
      });
    }
    next()
  };
};
/* Since middleware cannot have paramters so we wrap the middleware from a function that accepts rest parameter and return middleware */
```

```js
// use as
router.route("/:id").delete(authenticate, authorize("admin"), deleteUser); // in this route role admin is required to delete user

// or
router
  .route("/:id")
  .patch(authenticate, authorize("admin", "contributor"), deleteUser); // here any of these two is required to performed this action
```
