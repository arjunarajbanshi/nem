// Callback Hell Example : each asynchronous operation depends on the result of the previous one, causing callbacks to be nested inside other callbacks. Creates deeply indented code that is harder to read, maintain, and handle errors in.

const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => { // callback 1
    if (err) return console.log(err.message);
    const breed = data.trim();
    console.log(`Dog breed in txt file : ${breed}`);

    superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`).end((err, res) => { // callback 2
        if (err) {
            console.log(err.response.body);
            return;
        };
        console.log(res.body.message);

        fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err) => { // callback 3
            if (err) {
                console.log('Err saving image to file!')
            }
            console.log(`Image url saved to file.`)
        })
    })
})


// API - dog.ceo : https://dog.ceo/api/breed/hound/images/random


/* superagent : an HTTP client library used to make API requests. */

// data.trim(). This removes any trailing newline (\n) from dog.txt, which is a common cause of API requests failing when reading text files