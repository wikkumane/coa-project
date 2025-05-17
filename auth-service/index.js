const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Auth Service!');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`);
});
