const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    apikey: 'pscPbgj27sEYaPBdxYoHSshEDdt5Pivq',
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    client_id: 'TINGGTEST1710234558655',
    client_secret: 'FegTKoV66FfQFVmbM0k0TODFYS7eLYB4RhVdLoKbI',
    grant_type: 'client_credentials'
  })
};

fetch('https://api-approval.tingg.africa/v1/oauth/token/request', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));