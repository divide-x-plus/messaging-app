const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000
var app = express();

let public_path = path.join(__dirname, '../public');

app.use(express.static(public_path));

app.get('/', (req, res) => {
  res.send('index.html');
})

app.listen(port, () => {
  console.log(`server is up on ${port}`);
});
