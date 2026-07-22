/* READ & WRITE Files using fs module */

const fs = require("fs"); // Get the fs module and store in fs variable.

const helloWorld = "Hello world!"
/* BLOCKING, SYNCHRONOUS WAY */
/*  readFileSync :  Takes two args, 1st is path to file and 2nd is option : encoding  */
const readMyFile = fs.readFileSync("../progress.md", "utf-8");

console.log(readMyFile);

/*  writeFileSync(file, data, option) : where to write, what to write */
fs.writeFileSync('./helloWorld.txt', helloWorld);




/* NON-BLOCKING, ASYNCHRONOUS WAY(doesn't block the rest of the code execuation)

writeFile(path, data, options, callbackFn)

readFile(path, options, callbackFn)
    - callback takes 2 args : err and data(actual data)
*/

fs.writeFile("./async.txt", "I was written asynchronousy!", "utf-8", (err) => {
    if (err) {
        return console.log("err encounter!")
    }
    // only err as arg as there is no need for data reading this is for writing file
})

fs.readFile("./async.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("err encountered!")
    }
    console.log(data) // data which it has read
})
// add encoding to make it readabl for human

console.log("Even If i placed at last i will come before above async codes!")