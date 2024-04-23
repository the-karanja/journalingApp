const options = {
  method: 'POST',
  headers: {accept: 'application/json', 'content-type': 'application/json'},
  body: JSON.stringify({
    client_id: 'john.doe@example.com',
    client_secret: '',
    grant_type: 'client_credentials'
  })
};

fetch('https://api-dev.tingg.africa/v3/cas/oauth/token/request', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
