const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require("cors");
const Encryption = require('./Encryption');
const { checkout, create } = require("@tingg-sdk/checkout");
require('dotenv').config(); 

const port = process.env.PORT || 3000;
const app = express();


// Use json middleware to parse JSON in the request body
app.use(express.json());


//  A sample for value for req.body
// {
// merchant_transaction_id: "mtr-dg9823euy3a",
// account_number: "acc-14n345j5599",
// msisdn: "254700000000",
// service_code: "JOHNDOEONLINE",
// country_code: "KEN",
// currency_code: "KES",
// customer_last_name: "John",
// customer_first_name: "Doe",
// customer_email: "tingg@cellulant.io",
// request_amount: "100",
// due_date: "2023-11-18 16:15:30",
// language_code: "en",
// request_description: "Dummy merchant transaction",
// fail_redirect_url: "https://webhook.site/88390df9-a496-432f-abe5-0cf3380fda54",
// success_redirect_url: "https://webhook.site/88390df9-a496-432f-abe5-0cf3380fda54",
// callback_url: "https://webhook.site/88390df9-a496-432f-abe5-0cf3380fda54",
// };

/**
 * Initiates a checkout call and returns back the redirect link a customer can use to redirect to express checkout .
 */

app.post("/create", async (req, res) => {
    // Get these values from your .env config
    const apiKey = "jy9TZmsk8iSAXlMydEG35GxAodVBVoqx";
    const clientId = "PENTAGONPENSIONSERVI1711620089792";
    const clientSecret = "YkBgEcfmRHfdow7xyvHSGnxX7yXgbPoxo1tXjvCJp";

    // Get the JSON payload from the request
    const payload = req.body;

    const { error, data } = await create({apiKey, clientId, clientSecret, payload }, "testing");

    if (error == null) {
        //data: {long_url: string, short_url: string}
        res.status(200).send(data);
        return;
    }
    // Handle errors if error key is not null
    // Include validation errors and authentication errors
    res.status(400).send({
        status: 400,
        error: error,
    });
});

/**
 * Creates a checkout request by validating and encrypting the payload
 * @deprecated Use {@link create} instead
 */
app.post("/checkout", async (req, res) => {
    // Get these values from your .env config
    const ivKey = process.env.IV_KEY;
    const accessKey = process.env.ACCESS_KEY;
    const secretKey = process.env.SECRET_KEY;

    // Get the JSON payload from the request
    const payload = req.body;

    const { error, data } = await checkout({ payload, ivKey, secretKey, accessKey });

    // Handle errors if error key is not null
    // 1. Contains validation errors if any i.e {"<payload_field>": "validation error message"}
    // 2. Contains encryption errors if any i.e {"ivKey|secretKey|message": "encryption error message"}

    if (error === null) {
        res.status(200).json({
            access_key: accessKey,
            redirectURL: data.url,
            encrypted_payload: data.encrypted_payload,
        });
        return
    }
    res.status(400).send({
        status: 400,
        error: error,
    });
});

app.listen(port, () => {
    console.log(`[Example app]: Server is running at http://localhost:${port}`);
});