const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('Hellow Node');
  res.end();
});

server.listen(port, function (error) {
  if (error) {
    console.log(`somthing went wrong`, error);
  } else {
    console.log(`server is listening on port ${port}`);
  }
});
