const express = require('express');
const transfer = require('./fuctions/transfer');
const balance = require('./fuctions/balance');

const fs = require('fs')
const app = express();
const port = 3000;

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/', function(request, response) {
  fs.readFile('./static/html/home.html', function (err, data){
    if (err) {
      response.send('ERROR')
    } else {
      response.writeHead(200, {'Content-Type':'text/html'})
      response.write(data)
      response.end()
    }
  })
})

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
  console.log(`server is listening at localhost:`+port);
});