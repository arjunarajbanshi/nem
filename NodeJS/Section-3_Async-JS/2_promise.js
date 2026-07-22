const fs = require('fs');
const superagent = require('superagent');

// Promisify readFile
const readFilePro = file =>
    new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject(err); // catch() will have access to this when error
            else resolve(data); // then will take care of it when there is success
        });
    });

// Promisify writeFile
const writeFilePro = (file, data) =>
    new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject(err);
            else resolve('Success');
        });
    });

let imageUrl;

readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        const breed = data.trim();
        console.log(`Dog breed in txt file: ${breed}`);

        return superagent.get(
            `https://dog.ceo/api/breed/${breed}/images/random`
        );
    })
    .then(res => {
        imageUrl = res.body.message;
        console.log(imageUrl);

        return writeFilePro(
            `${__dirname}/dog-img.txt`,
            imageUrl
        );
    })
    .then(() => {
        console.log('Image url saved to file.');
    })
    .catch(err => {
        console.error('Error:', err.message); // every error is handled in one catch block
    });

/* 
.then() => handles successful promise/case, has response object
.catch() => handles rejected promise/case, has error object
*/