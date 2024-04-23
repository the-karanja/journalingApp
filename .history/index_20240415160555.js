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

app.post('/checkout', async function (req, res) {
  try {
   
 
    const accessToken = "eyJraWQiOiJjYXMtcGsiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyMjI1NTgiLCJwYXJlbnQiOiJDRUxLRSIsImxldmVsIjoiQ1VTVE9NRVIiLCJpc3MiOiJodHRwOi8vY2FzLWFwaS5hcHByb3ZhbDo4MDgwLyIsInV0eXBlIjoiU0FOREJPWF9BUEkiLCJhdWQiOiIqIiwibmFtZSI6IlBFTlRBR09OUEVOU0lPTlNFUlZJMTcxMTYyMDA4OTc5MiIsImNsaWVudCI6IlBFTlRBR09OUEVOU0lPTlNfS0VOIiwiZXhwIjoxNzEzMTg5MjYwLCJpYXQiOjE3MTMxODU2NjAsImN1c3RfaWQiOjYwOTYyLCJqdGkiOiI5YTJiMDkyMS0zNjUzLTQ1YjUtOWY4OS1iN2ZjOWIyYTI2M2M2YzY3M2NjNi03NjBmLTQyNDgtYjZmMS0xYzQ1MDc3MWY4OGEifQ.lRA0M1PVp1Z3Gx5eXBDaV4hyTPDKpg_lwfHkaHHTtmf_S5VOvwljRgATaEGQao-hjGw2NS4m7kSacZ28ZW_TUWL-VaoDMhPbACDJzclMuQoS8vB2aCUuq_6mMU08AdKUdmYn-OlgeE70tbX58MHvzuisMZEecqK8HuzqpAxq8LDwfL9pZSsB_K-b_aDLmGCbEiA5EpWebbP-P2L4JBX9WaOaEUDlrZ-1EfhqOt0TTGxDPoDCmWOwqPVQUcZ79uBoJoleq6n5f983W5cFvB1ydfMiybfRh-rZUn1pK4vgvZjR2N8OwjEtLkXvhmJwUxnx-tsS7NhjO-uZ-aQvkwix1w";
 

    const options = {
      method: 'POST',
      url: 'https://api-approval.tingg.africa/v3/checkout-api/checkout/request',
      headers: {
        'accept': 'application/json',
        'apikey': process.env.API_KEY,
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      data: {
        msisdn: '254700000000',
        account_number: 'TinggAcc01',
        callback_url: 'https://jsonplaceholder.typicode.com/todos/1',
        country_code: 'KEN',
        currency_code: 'KES',
        customer_email: 'johndoe@gmail.com',
        customer_first_name: 'John',
        customer_last_name: 'Doe',
        due_date: new Date('2024-03-28T20:00:00').toISOString(),
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
      }
    };

    const response = await axios(options);
    
    // Send the Tingg API response back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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


// these endpoint allows you to query for the status of the request raised
app.get('/checkout/checkout_status', function(req,res) {
  const options = {
    method: 'get',
    url: 'https://api-approval.tingg.africa/v3/checkout-api/query/TINGGTEST/787867001614',
    headers: {
      'Accept': 'application/json',
      'apikey': process.env.API_KEY,
      'Authorization': `Bearer ${token}`
    }
  };
  
  axios(options)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
