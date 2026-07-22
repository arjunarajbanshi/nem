> # Seding JWT via cookie

```
JWT_COOKIE_EXPIRES_IN=90
```

```js
// everything is same just we have to send jwt token via cookie

const cookieOption = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  ),
  secure: true, // for using https, comment this part if you are in dev as we are using only http
  httpOnly: true,
};

// if(process.env.NODE_ENV==='production') cookieOption.secure = true;

res.cookie("any-name", jwt - token, cookieOption);
```
