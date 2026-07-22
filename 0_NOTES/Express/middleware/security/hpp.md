> # hpp
>
> http parameter pollution

```bash
npm i hpp
```

```js
const hpp = require("hpp");

// Prevents parameter pollution
app.use(hpp()); // should be used at the end of the middleware stack

/* we can also pass option to whitelist what to allow
app.use(
  hpp({
    whitelist: ["duration", "rating"],
  }),
);
*/
```

## END
