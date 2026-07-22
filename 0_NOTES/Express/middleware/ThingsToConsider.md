
Create MongoDB Atlas Account
and get a connection string in order to use mongodb atlas


Naming conventions
use plurals
/users
/users/:id

/api/v1/ then above

## Mistake 1
```js
/*
req.params → URL (/books/:id) ⇒ Always string
req.query → ?id=2 ⇒ Always String
req.body → POST/PUT data

convert string into number using Number() or pareseInt(). 
*/

app.get("/students/:id", (request, response) => {
    const { id } = request.params // coming from url so params and is string
    for (let i = 0; i < students.length; i++) {
        if (Number(id) === students[i].id) { // convert into number
            return response.send(JSON.stringify(students[i]))
        }

    }

    return response.send("Student not found.");
});
```

Cloudnary
frontend user uploads => uploads in Cloudnary => cloudnary gives images/videos url => use mongodb to store that url

New********
npm i mailtrap crypto 

filename can be like this as also ⇒ anything.anything.js or auth.route.js or auth.controller.js

extension ⇒ vscode great icons



jwt + cookie
The frontend never stores or reads the JWT.
• Backend sets JWT in an HTTP-only cookie
• Browser automatically sends it on every request
• Axios just needs withCredentials: true
• XSS impact is massively reduced