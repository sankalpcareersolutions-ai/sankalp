const http = require('http');

const data = JSON.stringify({
  topic: 'how to study',
  keywords: 'study, preparation'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/generate-seo-content',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Status:', res.statusCode, body));
});

req.on('error', error => console.error(error));
req.write(data);
req.end();
