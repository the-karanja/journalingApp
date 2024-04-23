const cors = require("cors")

const express = require('express');
const Encryption = require('./Encryption')

const app = express();
const port = 3000;

app.use(cors())
// enable parsing application/json
app.use(express.json());

app.post('/checkout-encryption', (req, res) => {
    const accessKey = "h2nnVVDMVnXx2ZLahLXL0XnVLDhMaa0axUM0DUVx0h02eVxXXV0002M0XDUL";
    const IVKey = "mYEdoUIcAot8MjU0";
    const secretKey = "XDZ2VUVaLM0xn0eh";
    const algorithm = "aes-256-cbc";

    // get the request body
    const requestBody = req.body;
    
    let encryption = new Encryption(IVKey, secretKey, algorithm)

    const payload = JSON
        .stringify(requestBody)
        .replace(/\//g, '\\/');

    console.log(`https://developer.tingg.africa/checkout/v2/express/?params=${encryption.encrypt(payload)}&accessKey=${accessKey}&countryCode=KEN`)
    // return a JSON response
    res.json({
        params: encryption.encrypt(payload),
        accessKey,
        countryCode: requestBody.countryCode
    });
});

app.listen(
    port,
    () => console.log(`Listening on port ${port}!`)
);