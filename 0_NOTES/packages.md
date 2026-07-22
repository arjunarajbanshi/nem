> # PACKAGES

- slugify  &rarr; To create slug

- express
- postman  &rarr; for testing API's
- nodemon  &rarr;

eslint &rarr; Use to find and fix problems in js code
npm install @eslint/config@latest

dotenv &rarr; loads environment variables from a .env file into process.env
⇒ npm i dotenv

cors() &rarr; Middleware for that enables Cross-Origin Resource Sharing. Request from one/different origin can make request to another/different origin.

multer &rarr; Middleware for expressjs that handles multipart/form-data, which is primarily used for uploading files but is also necessary to correctly parse text filds sent via FormData.

express.json() &rarr; Built-in Express Middleware for parsing incoming request bodies with JSON payloads.
usage ⇒ app.use( express.json() )

bodyParser.json() &rarr; External middleware for parsing incoming request bodies with JSON payloads.
npm install body-parser

express.urlencoded({extended:false}) &rarr; built-in express middleware function to parse incoming requests with URL-encoded payloads. Usually for form.

express-rate-limit &rarr; rate-limiting middleware forExpress, used to limit repeated requests to public APIsand/or endpoints such as password reset.
`Installation ⇒ npm install express-rate-limit`

cookieParser() &rarr; To read cookie to read from incoming request

## Useful for integrating map

- mapbox

## other

- parcel.js
- axios
- babel/polyfill
- compression

## for images

- `sharp` : image processing library

```js
// using sharp
exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
 await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 }).toFile(`public/img/user/${myfile.jpeg}`);
  next();
};
```

## For email
- Nodemailer
- sendgrid
- mailtrap
- mailsac | tempmail

## Payment
- Stripe

## Deployment
- Heroku
```bash
sudo snap install heroku --clasic
```
