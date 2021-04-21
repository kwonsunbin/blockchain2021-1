const express = require('express');
const transfer = require('./fuctions/transfer');
const balance = require('./fuctions/balance');

const app = express();
const port = 3000;

app.get('/transfer', transfer, (req, res) => {
  res.json({
    success: true,
    data: res.data,
  });
});

app.get('/balance', balance, (req, res) => {
  res.json({
    success: true,
    data: res.data,
  });
});

app.listen(port, () => {
  console.log(`server is listening at localhost:3000`);
});
