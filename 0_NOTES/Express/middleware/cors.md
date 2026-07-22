> # Cors

```js
/*
CORS : Cross-Origin Resource Sharing
	Is a browser security mechanism that controls whether a web page running on
    one origin(scheme+host+port) is allowed to make requests to different origin.
	By default browser blocks such cross-origin request.

Installation : npm i cors
*/

// Enable CORS for all routes and origins
app.use(cors()) // makes accessible from any origin


// Allow only specific origin
app.use(
  cors({
    origin: "http://localhost:3000", // ['a.com','localhost:800'] for multiple
    methods: ['GET','POST','PUT','DELETE'], // limit http verbs
    credentials:true, // if you need cookies/auth headers
    allowedHeaders:['Content-Type','Authorization'] // headers
    // more : exposedHeaders, maxAge, preflightContinue, optionsSuccessStatus etc
  })
);


// Enable CORS for a specific route
app.post('/login', cors(), (req, res) => {
  // login logic here
});


/*
Why and when to use :
- Control who can access your API
- Frontend and backend are on different origins
*/
```