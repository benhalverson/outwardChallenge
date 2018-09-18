const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());
app.use(express.static('public'))
let totalVisit = 0;
app.get('/', (req, res) => {
  totalVisit++;
  res.json({
    views: totalVisit
  });
});


app.get('/math/add/:id/:id2', (req, res) => {
  totalVisit++;
  const x = parseInt(req.params.id);
  const y = parseInt(req.params.id2);
  const data = [x, y].reduce((a, b) => a + b);
  res.json({ 
    data,
    views: totalVisit
   });
});

app.get('/math/subtract/:id/:id2', (req, res) => {
  totalVisit++;
  const x = parseInt(req.params.id);
  const y = parseInt(req.params.id2);
  const data = [x, y].reduce((a, b) => a - b);
  res.json({
    data,
    views: totalVisit
  });
});

app.get('/math/multiply/:id/:id2', (req, res) => {
  totalVisit++;

  const x = parseInt(req.params.id);
  const y = parseInt(req.params.id2);
  const data = [x, y].reduce((a, b) => a * b);
  res.json({
    data,
    views: totalVisit
  });
});

app.get('/math/multiply/:id/:id2', (req, res) => {
  totalVisit++;
  const x = parseInt(req.params.id);
  const y = parseInt(req.params.id2);
  const data = [x, y].reduce((a, b) => a * b);
  res.json({
    data,
    views: totalVisit
  });
});

app.get('/math/divide/:id/:id2', (req, res) => {
  totalVisit++;
  const x = parseInt(req.params.id);
  const y = parseInt(req.params.id2);
  const data = [x, y].reduce((a, b) => a / b);
  res.json({
    data,
    views: totalVisit
  });
});

app.post('/math', (req, res) => {
  totalVisit++;
  if (!req.body.value1 || !req.body.value2 ) {
    return res.status(400).send({
      sucess: false,
      message: 'value 1 and 2 are required',
      views: totalVisit
    });
  }
  if (!req.body.operand) {
    return res.status(400).send({
      sucess: false,
      message: 'operand is required',
      views: totalVisit
    });
  }
  const total = {
    value1: parseFloat(req.body.value1),
    value2: parseFloat(req.body.value2),
    operand: req.body.operand,
    views: totalVisit
  }

  if (total.operand === '+') {
    const data = [total.value1, total.value2].reduce((a, b) => a + b); 
    res.json({
      data,
      views: totalVisit
    });
  }

  if (total.operand === '-') {
    const data = [total.value1, total.value2].reduce((a, b) => a - b); 
    res.json({
      data,
      views: totalVisit
    });
  }

  if (total.operand === '*') {
    const data = [total.value1, total.value2].reduce((a, b) => a * b); 
    res.json({
      data,
      views: totalVisit
    });
  }

  if (total.operand === '/') {
    const data = [total.value1, total.value2].reduce((a, b) => a / b); 
    res.json({
      data,
      views: totalVisit
    });
  }

});

app.get('/game', (req, res) => {
  // load html page
  // initialize Phaser/PIXI/Three.js/Babylon.JS and do something non-trivial 

  res.sendFile(path.join(__dirname, './public', 'index.html'));
})

module.exports = app.listen(PORT, (err) => {
  if(err) throw err;
  console.log(`listening on port ${PORT}`);
})

 