// async await

const { log } = require('console');
const fs = require('fs');
const superagent = require('superagent');

// Promisify readFile
const readFilePro = file =>
    new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
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

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        const breed = data.trim();
        console.log(`Dog breed in txt file: ${breed}`);

        const res = await superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        imageUrl = res.body.message;
        console.log(imageUrl);

        await writeFilePro(`${__dirname}/dog-img.txt`, imageUrl);
        console.log('Image url saved to file.');
    } catch (err) {
        console.error('Error:', err.message);
        throw (err); // for handling error when returning or making it rejected promise and next catch block able to catch error
    }

    // We can also return something
    return "Done!" // If we don't throw errow in catch block, it will still give successful value or will return this even if there error occurs and catch handler below will not able to catch error 

}
// getDogPic();

// If we also want to get the return value from getDogPic function we should use .then() method
getDogPic().then(x => console.log(x)).catch(err => console.log(err.message))


/* Another way : async await in IIFE */
/*
(async () => {
    try {
        const x = await getDogPic();
        console.log(x);
    } catch (error) {
        console.log(error.message)
    }
})();
*/


/* waiting for multiple promise simultaneously : promise.all()
        
const res1Pro = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);

const res2Pro = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);

const all = await Promise.all([res1Pro, res2Pro]);

const imgs = all.map(el=>el.body.message);

console.log(imgs);

await writeFilePro(`${__dirname}/dog-img.txt`, imgs.join('\n'));
*/
 
/* .join() method creates and returns a new string by concatenating all elements of an array, separated by a specified separator string. For above situation \n is newline */

/* Important: An async function always returns a Promise:
    return value → resolves the Promise with that value.
    throw error → rejects the Promise with that error.

Each await pauses the execution of the async function until the Promise resolves.
*/