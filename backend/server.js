const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors()); 

let goodCount = 0;
let notGoodCount = 0;
let lastClicked = null; 


app.get('/api/status', (req, res) => {
  res.json({
    goodCount,
    notGoodCount,
    lastClicked, 
  });
});


app.post('/api/click/good', (req, res) => {
  goodCount += 1;
  lastClicked = 'good'; 
  res.json({ message: 'Good clicked', goodCount, notGoodCount });
});


app.post('/api/click/notGood', (req, res) => {
  notGoodCount += 1;
  lastClicked = 'notGood'; 
  res.json({ message: 'Not Good clicked', goodCount, notGoodCount });
});


app.post('/api/admin/reset', (req, res) => {
  goodCount = 0;
  notGoodCount = 0;
  lastClicked = null; 
  res.json({ message: 'Counts reset successfully', goodCount, notGoodCount });
});


app.post('/api/admin/click/good', (req, res) => {
  goodCount += 1;
  lastClicked = 'good';
  res.json({ message: 'Admin Good clicked', goodCount, notGoodCount });
});

app.post('/api/admin/click/notGood', (req, res) => {
  notGoodCount += 1;
  lastClicked = 'notGood';
  res.json({ message: 'Admin Not Good clicked', goodCount, notGoodCount });
});
let machineStatus = false; // false means machine is off, true means machine is on

app.get('/api/machine-status', (req, res) => {
  res.json({ isRunning: machineStatus });
});

app.post('/api/admin/machine-toggle', (req, res) => {
  machineStatus = !machineStatus;
  res.json({ isRunning: machineStatus });
});



app.use('/admin', express.static(path.join(__dirname, 'admin-panel')));


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
