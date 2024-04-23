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
        process.env.ACCESS_TOKEN = response.data.access_token;
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ error: `$error` });
    }
});

app.post('/checkout', function (req, res) {
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'apikey': process.env.API_KEY,
      'Authorization': 'eyJraWQiOiJjYXMtcGsiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyMjI1NTgiLCJwYXJlbnQiOiJDRUxLRSIsImxldmVsIjoiQ1VTVE9NRVIiLCJpc3MiOiJodHRwOi8vY2FzLWFwaS5hcHByb3ZhbDo4MDgwLyIsInV0eXBlIjoiU0FOREJPWF9BUEkiLCJhdWQiOiIqIiwibmFtZSI6IlBFTlRBR09OUEVOU0lPTlNFUlZJMTcxMTYyMDA4OTc5MiIsImNsaWVudCI6IlBFTlRBR09OUEVOU0lPTlNfS0VOIiwiZXhwIjoxNzEzMTg3NDMxLCJpYXQiOjE3MTMxODM4MzEsImN1c3RfaWQiOjYwOTYyLCJqdGkiOiI3YWI1N2I0Yy01YTliLTRhYjktODhhZS1lODVlNDQ4ZDExMTZjYTU4ZjY2Mi1kMmEwLTRiMTAtODcxNy0zMTNhMGU5NmY1ZjEifQ.bgIp5AfreN1btiEsWjb743tSLu736qQ1qG9IhiI-SUaguX6TiMdOPHOVXS0HuUxhxifwfDAtoRsaniGjMnHu2LEDMGQWgY7Kbc8eVfU1zDf3OiWfFd2dGmcsv4JdE0_10aJv7vWQMCdqjl3K3kl--1etb5NvqiKrjmTC6XeJ_J-0m1KH_k_PPg0533F4rdGRaFHzwmY7u4M5LJnPf1nnkNdQk4DrIlfPlBMjOGtD0nTnRXzwgCAf7nZw1XyyVxVPzbrGcxs4N-iQKj5uY1A-mx1uy__dDnbrgUVve3mhCKL2zXKOKlxVv1IBRYwgXDq4XGib00PmdcwMYUNDbslREA',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      msisdn: '254700000000',
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
    })
  };
  
  fetch('https://api-approval.tingg.africa/v3/checkout-api/checkout/request', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
});



// checkout url callaback url
app.get('/checkout/callbackurl', function(req, res, next) {
  console.log(req);
});


// failed checkout redirect url 
app.get('/checkout/fail_redirect_url', function(req, res) {
  console.log(req);
});


// successful checkout redirect url
app.get('/checkout/success_redirect_url', function(req, res){
  console.log(req);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
