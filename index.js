const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Multer configuration
const upload = multer({ dest: 'uploads/' });

// Home route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// File upload route (IMPORTANT)
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {

  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });

});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
