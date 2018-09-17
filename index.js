const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // count the number of visit on the root...
})


app.get('/math/add/:id/:id2', (req, res) => {
  const x = parseInt(req.params.id);
  const y = parseInt(req.params.id2);
  const data = [x, y].reduce((a, b) => a + b);
  res.json({ data });
});

app.get('/math/subtract/:id/:id2', (req, res) => {
  const x = parseInt(req.params.id);
  const y = parseInt(req.params.id2);
  const data = [x, y].reduce((a, b) => a - b);
  res.json({ data });
});

app.get('/math/multiply/:id/:id2', (req, res) => {
  const x = parseInt(req.params.id);
  const y = parseInt(req.params.id2);
  const data = [x, y].reduce((a, b) => a * b);
  res.json({ data });
});

app.get('/math/multiply/:id/:id2', (req, res) => {
  const x = parseInt(req.params.id);
  const y = parseInt(req.params.id2);
  const data = [x, y].reduce((a, b) => a * b);
  res.json({ data });
});

app.get('/math/divide/:id/:id2', (req, res) => {
  const x = parseInt(req.params.id);
  const y = parseInt(req.params.id2);
  const data = [x, y].reduce((a, b) => a / b);
  res.json({ data });
});


app.listen(PORT, (err) => {
  if(err) throw err;
  console.log(`listening on port ${PORT}`);
})

