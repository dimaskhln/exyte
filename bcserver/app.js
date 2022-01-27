const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../front/dist/')));

app.get('/api/evaluate', (req, res) => {
  try {
    switch (req.query.action) {
      case 'add':
        res.json({ result: Number(req.query.first) + Number(req.query.second) });
        break;
      case 'subtract':
        res.json({ result: Number(req.query.first) - Number(req.query.second) });
        break;
      case 'multiply':
        res.json({ result: Number(req.query.first) * Number(req.query.second) });
        break;
      case 'divide':
        res.json({ result: Number(req.query.first) / Number(req.query.second) });
        break;
      default:
        res.json({ result: 'Unsupported action' });
        break;
    }
  } catch {
    res.json({ result: 'Error in evaluating' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/dist/'));
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
