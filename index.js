const http = require('http');

const port = process.env.PORT || 3000; // Railway-provided port
const hostname = '0.0.0.0';           // Bind to all network interfaces

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
