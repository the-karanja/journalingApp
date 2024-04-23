const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // Load .env variables

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
const accessToken = "eyJraWQiOiJjYXMtcGsiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyMjI1NTgiLCJwYXJlbnQiOiJDRUxLRSIsImxldmVsIjoiQ1VTVE9NRVIiLCJpc3MiOiJodHRwOi8vY2FzLWFwaS5hcHByb3ZhbDo4MDgwLyIsInV0eXBlIjoiU0FOREJPWF9BUEkiLCJhdWQiOiIqIiwibmFtZSI6IlBFTlRBR09OUEVOU0lPTlNFUlZJMTcxMTYyMDA4OTc5MiIsImNsaWVudCI6IlBFTlRBR09OUEVOU0lPTlNfS0VOIiwiZXhwIjoxNzEzNTE2NTIzLCJpYXQiOjE3MTM1MTI5MjMsImN1c3RfaWQiOjYwOTYyLCJqdGkiOiI4OTY5NzM1NC0wOGJkLTRmNTMtYTc4ZS02NDU2ZWEwZDRhZmU3YmIwMGRiMi00N2FiLTQ0MTQtOTlkNy0yYzczNWE5YjQ5MjkifQ.ZbHtFG1Fx_zPwWJJjF-koQ_t7NgLiMLonQbWSdX46B58bLbC3PsxaMHVvgnZdhxJt0Bb0G5GMwrOrQqQpD_jjC2n0BWPWe1KfgiLFD8fLrlNtHkvjKl-pM-nAmsdIsnOhVcIm6r9Hn3ykvaELppCORAjbZAn61xQEPsgpMQo-CYGvqIffVebFl3LL-pW44nZK3ksUEMwIlULcjBDLyVIeHY9nlb66TTPEXcDETLzHSVTZjcAIfgxhgC6q3yiIFh6ehptCH72Llil5CuGNkf_WMTY2ltJMU16_aTg4BQrfxBGAcvs1hbz4OQu5UhJqc0t1e_4zrMMRxwEShKaLg4K8w" ;

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

app.post('/checkoutAndCharge', async function(req,res) {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'apikey': process.env.API_KEY,
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        msisdn: '254743126150',
        account_number: 'TinggAcc01',
        callback_url: 'https://online.dev.tingg.africa/development/configuration-service/v3/merchantcallbackurlforsuccess',
        country_code: 'KEN',
        currency_code: 'KES',
        customer_email: 'johndoe@mail.com',
        customer_first_name: 'John',
        customer_last_name: 'Doe',
        due_date: '2024-05-28 20:00:00',
        fail_redirect_url: 'https://jsonplaceholder.typicode.com/todos/1',
        invoice_number: '13456789',
        merchant_transaction_id: '787867001700',
        request_amount: 100,
        national_id: '12345622',
        passport_number: '12345622',
        request_description: 'Bag',
        service_code: 'PENTAGONPENSIONSERVI',
        success_redirect_url: 'https://jsonplaceholder.typicode.com/todos/1',
        is_offline: true,
        payment_option_code: 'SAFKE'
      })
    };
    
    const response = await axios(options);
    
    // Send the Tingg API response back to the client
    res.json(response.data);
  } catch (error) {
    
  }
});


app.post('/checkout/charge', function (req, res){
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'apikey': process.env.API_KEY,
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        charge_msisdn: '254743126150',
        charge_amount: '100',
        country_code: 'KEN',
        currency_code: 'KES',
        merchant_transaction_id: '787867001444',
        service_code: 'TINGGTEST',
        payment_mode_code: 'STK_PUSH',
        payment_option_code: 'SAFKE'
      })
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/checkout', async function (req, res) {
  try {
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
        msisdn: '254743126150',
        account_number: 'TinggAcc01',
        callback_url: 'https://jsonplaceholder.typicode.com/todos/1',
        country_code: 'KEN',
        currency_code: 'KES',
        customer_email: 'oe@gmail.com',
        customer_first_name: 'John',
        customer_last_name: 'Doe',
        due_date: '2024-05-28 20:00:00',
        payment_option_code: 'ABCRA',
        fail_redirect_url: 'https://jsonplaceholder.typicode.com/todos/1',
        invoice_number: '1234',
        merchant_transaction_id: '787867001444',
        raise_invoice: false,
        request_amount: 100,
        national_id: '12345677',
        passport_number: '12345677',
        request_description: 'Bag',
        service_code: 'PENTAGONPENSIONSERVI',
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


// this endpoint allows you to query for the status of the request raised
app.get('/checkout/checkout_status', function(req,res) {
  const options = {
    method: 'get',
    url: 'https://api-approval.tingg.africa/v3/checkout-api/query/TINGGTEST/787867001614',
    headers: {
      'Accept': 'application/json',
      'apikey': process.env.API_KEY,
      'Authorization': `Bearer ${accessToken}`
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


//this endpoint allows the company(merchant) to refund the client after a successful transaction
app.post('/refund', function(req, res){
  const options = {
    method: 'POST',
    url: 'https://api-approval.tingg.africa/v3/checkout-api/refund/request',
    headers: {
      'accept': 'application/json',
      'apikey': process.env.API_KEY,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    data: {
      currency_code: 'KES',
      merchant_transaction_id: '787867001614',
      refund_type: 'FULL',
      amount: '100',
      refund_narration: 'User refunded from portal',
      refund_reference: 'PRF0018',
      service_code: 'TINGGTEST',
      payment_id: '183'
    }
  };
  
  axios(options)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
});



// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
