const express = require('express');
const app = express();

// Use Railway's PORT or fallback to 3000 locally
const port = process.env.PORT || 3000;

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Listen on the port and 0.0.0.0
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
