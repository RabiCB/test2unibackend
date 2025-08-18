const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Railway!');
});
app.get("/universities", (req, res) => {
  res.json({ message: "Hello from Railway 🚆" });
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});


