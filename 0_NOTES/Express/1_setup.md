> # Setup & Initialization

## Creating Express App
```bash
mkdir learnExpress

cd learnExpress

npm init -y # y ⇒ accepting all incoming
# remove -y ⇒ for manual setup

touch index.js

npm install express # Or npm i express
# To remove => npm remove express
```

```js
const express = require('express') /* Importing it inorder to use it */

const app = express(); /* Making instance of express */

app.get('/', (req,res)=> res.send('Hello Express!')) /* use send() method 
of the response objext to send response to client */

app.listen(3000, ()=> console.log('Listening on port 300'))

/*
get() method takes two parameter
	path : "/", "/anyPathName"
	callBackFn(requestObject, responseObject) : 

listen() method takes two parameters
	Port Number
	CallBackFunction
*/
```

## Using ES6 
- Add `"type" : "module"` inside _package.json_ file.
   - Then we can import as `import express from ‘express’`

## Run
```bash
# Open Terminal

node index.js # main file

# Add | "serve" : "node index.js" | inside script of package.json file
# Thus we can also run above like so
npm run serve

# You need to restart(stop and the start) the server everytime you make any changes to that file
# nodemon solves this problem by automatically restarting whenever  we make any changes
npm install nodemon
# Add | "dev" : "nodemon index.js" | inside script of package.json file
# Then run like this
npm run dev

# WHATEVER INSIDE OF SCRIPT can be run as
npm run propertyName
```