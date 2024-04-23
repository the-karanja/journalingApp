const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // Load .env variables

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route handler for POST /oauth/token/request
app.post('/oauth/token/request', async (req, res) => {
    const { grant_type } = req.body;
    const { CLIENT_ID, CLIENT_SECRET, API_KEY } = process.env; // Destructure variables from .env
    
    try {
        // Make a POST request using Axios
        const response = await axios.post('https://api-approval.tingg.africa/v1/oauth/token/request', {
            client_id: CLIENT_ID, // Use client_id from .env
            client_secret: CLIENT_SECRET, // Use client_secret from .env
            grant_type: 'client_credentials'
        }, {
            headers: {
                'accept': 'application/json',
                'apikey': API_KEY, // Use API_KEY from .env
                'content-type': 'application/json'
            }
        });
        
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ error: `$error` });
    }
});

app.post('/chekout/initiate-chekout', function (req, res) {
  const { CLIENT_ID, CLIENT_SECRET, API_KEY } = process.env; 
  // an async function to initiate the checkout process
  async function initiate(){
    const requestData = {
    msisdn: '254743126150',
    account_number: 'TinggAcc01',
    callback_url: 'https://jsonplaceholder.typicode.com/todos/1',
    country_code: 'KEN',
    currency_code: 'KES',
    customer_email: 'johndoe@gmail.com',
    customer_first_name: 'John',
    customer_last_name: 'Doe',
    due_date: '2024-03-28 20:00:00',
    payment_option_code: 'ABC',
    fail_redirect_url: 'https://jsonplaceholder.typicode.com/todos/1',
    invoice_number: '1234',
    merchant_transaction_id: '787867001614',
    raise_invoice: false,
    request_amount: 100,
    national_id: '123456',
    passport_number: '123456',
    request_description: 'Bag',
    service_code: 'TINGGTEST',
    success_redirect_url: 'https://jsonplaceholder.typicode.com/todos/1'
    };


    const options = {
      method: 'POST',
      url: 'https://api-approval.tingg.africa/v3/checkout-api/checkout/request',
      headers:{
        'Accept': 'application/json',
        'apiKey': API_KEY,
        'content-type': 'application/json',
      },
      data: requestData,
    };


    try {
      const response = await axios(options);
      console.log(response);
    } catch (err) {
      console.log(err); //ERROR FROM THE API REQUEST
    }

    initiate();
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
